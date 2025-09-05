import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, DollarSign, Clock } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Masaje Terapéutico',
      description: 'Masaje profundo para aliviar tensiones musculares y dolores crónicos',
      duration: 60,
      price: 85,
      category: 'Terapéutico'
    },
    {
      id: '2',
      name: 'Masaje Relajante',
      description: 'Masaje suave para reducir el estrés y promover la relajación',
      duration: 45,
      price: 65,
      category: 'Relajación'
    }
  ]);

  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: 60,
    price: 0,
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
      price: 0,
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
      price: service.price,
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
      price: 0,
      category: ''
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Servicios</h1>
          <p className="text-gray-600 mt-2">Gestiona tus servicios y precios</p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Servicio
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
              <div className="text-sm text-purple-600 font-medium">
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
                <div className="flex items-center font-semibold text-green-600">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {service.price} NZD
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
              {editingService ? 'Editar Servicio' : 'Agregar Nuevo Servicio'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre del Servicio</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ej: Masaje Terapéutico"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe tu servicio..."
                  rows={3}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duración (minutos)</Label>
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
                  <Label htmlFor="price">Precio (NZD)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="category">Categoría</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="Ej: Terapéutico, Relajación, Deportivo"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  {editingService ? 'Actualizar' : 'Agregar'} Servicio
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
