import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, Clock } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  category: string;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Personal Training Session',
      description: 'One-on-one fitness training tailored to your goals and fitness level',
      duration: 60,
      category: 'Health & Wellness'
    },
    {
      id: '2',
      name: 'Guitar Lessons',
      description: 'Learn guitar from basics to advanced techniques with personalised instruction',
      duration: 45,
      category: 'Education & Development'
    },
    {
      id: '3',
      name: 'Photography Session',
      description: 'Professional photography for portraits, events, or special occasions',
      duration: 120,
      category: 'Creative Services & Entertainment'
    }
  ]);

  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: 60,
    category: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingService) {
      // Edit existing service
      setServices(prev => prev.map(service => 
        service.id === editingService.id 
          ? { ...formData, id: service.id }
          : service
      ));
      setEditingService(null);
    } else {
      // Add new service
      const newService: Service = {
        ...formData,
        id: Date.now().toString()
      };
      setServices(prev => [...prev, newService]);
    }
    
    setFormData({
      name: '',
      description: '',
      duration: 60,
      category: ''
    });
    setShowForm(false);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      duration: service.duration,
      category: service.category
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setServices(prev => prev.filter(service => service.id !== id));
  };

  const handleCancel = () => {
    setEditingService(null);
    setShowForm(false);
    setFormData({
      name: '',
      description: '',
      duration: 60,
      category: ''
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Services</h1>
          <p className="text-gray-600 mt-2">Manage your services and offerings</p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          style={{
            background: '#FF6B35',
            transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#5A9F3A';
            e.target.style.transform = 'translateY(-1px) scale(1.005)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#FF6B35';
            e.target.style.transform = 'translateY(0) scale(1)';
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {services.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span className="text-lg">{service.name}</span>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(service)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(service.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
              <div className="text-sm font-medium" style={{color: '#FF6B35'}}>
                {service.category}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {service.duration} min
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Service Form */}
      {showForm && (
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>
              {editingService ? 'Edit Service' : 'Add New Service'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Service Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Personal Training Session"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your service..."
                  rows={3}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  min="15"
                  step="15"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="e.g. Health & Wellness, Education & Development"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  style={{
                    background: '#FF6B35',
                    transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#5A9F3A';
                    e.target.style.transform = 'translateY(-1px) scale(1.005)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#FF6B35';
                    e.target.style.transform = 'translateY(0) scale(1)';
                  }}
                >
                  {editingService ? 'Update' : 'Add'} Service
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Services;
