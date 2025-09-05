import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Check, X, Plus } from 'lucide-react';

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface DaySchedule {
  day: string;
  isWorking: boolean;
  timeSlots: TimeSlot[];
}

const Availability = () => {
  const [schedule, setSchedule] = useState<DaySchedule[]>([
    {
      day: 'Lunes',
      isWorking: true,
      timeSlots: [
        { id: '1', day: 'Lunes', startTime: '09:00', endTime: '17:00', isAvailable: true }
      ]
    },
    {
      day: 'Martes',
      isWorking: true,
      timeSlots: [
        { id: '2', day: 'Martes', startTime: '09:00', endTime: '17:00', isAvailable: true }
      ]
    },
    {
      day: 'Miércoles',
      isWorking: true,
      timeSlots: [
        { id: '3', day: 'Miércoles', startTime: '09:00', endTime: '17:00', isAvailable: true }
      ]
    },
    {
      day: 'Jueves',
      isWorking: true,
      timeSlots: [
        { id: '4', day: 'Jueves', startTime: '09:00', endTime: '17:00', isAvailable: true }
      ]
    },
    {
      day: 'Viernes',
      isWorking: true,
      timeSlots: [
        { id: '5', day: 'Viernes', startTime: '09:00', endTime: '17:00', isAvailable: true }
      ]
    },
    {
      day: 'Sábado',
      isWorking: false,
      timeSlots: []
    },
    {
      day: 'Domingo',
      isWorking: false,
      timeSlots: []
    }
  ]);

  const [editingDay, setEditingDay] = useState<string | null>(null);
  const [newTimeSlot, setNewTimeSlot] = useState({
    startTime: '09:00',
    endTime: '17:00'
  });

  const toggleWorkingDay = (day: string) => {
    setSchedule(prev => prev.map(d => 
      d.day === day 
        ? { ...d, isWorking: !d.isWorking, timeSlots: d.isWorking ? [] : [{ 
            id: Date.now().toString(), 
            day, 
            startTime: '09:00', 
            endTime: '17:00', 
            isAvailable: true 
          }] }
        : d
    ));
  };

  const addTimeSlot = (day: string) => {
    if (!newTimeSlot.startTime || !newTimeSlot.endTime) return;
    
    setSchedule(prev => prev.map(d => 
      d.day === day 
        ? { 
            ...d, 
            timeSlots: [...d.timeSlots, {
              id: Date.now().toString(),
              day,
              startTime: newTimeSlot.startTime,
              endTime: newTimeSlot.endTime,
              isAvailable: true
            }]
          }
        : d
    ));
    
    setNewTimeSlot({ startTime: '09:00', endTime: '17:00' });
    setEditingDay(null);
  };

  const removeTimeSlot = (day: string, slotId: string) => {
    setSchedule(prev => prev.map(d => 
      d.day === day 
        ? { ...d, timeSlots: d.timeSlots.filter(slot => slot.id !== slotId) }
        : d
    ));
  };

  const toggleTimeSlotAvailability = (day: string, slotId: string) => {
    setSchedule(prev => prev.map(d => 
      d.day === day 
        ? { 
            ...d, 
            timeSlots: d.timeSlots.map(slot => 
              slot.id === slotId 
                ? { ...slot, isAvailable: !slot.isAvailable }
                : slot
            )
          }
        : d
    ));
  };

  const getDayStatus = (day: DaySchedule) => {
    if (!day.isWorking) return { label: 'No disponible', color: 'bg-gray-100 text-gray-600' };
    if (day.timeSlots.length === 0) return { label: 'Sin horarios', color: 'bg-yellow-100 text-yellow-700' };
    return { label: 'Disponible', color: 'bg-green-100 text-green-700' };
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Mi Disponibilidad</h1>
        <p className="text-gray-600 mt-2">Gestiona tu horario y disponibilidad semanal</p>
      </div>

      <div className="grid gap-6">
        {schedule.map((day) => {
          const status = getDayStatus(day);
          
          return (
            <Card key={day.day} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <CardTitle className="text-lg">{day.day}</CardTitle>
                    <Badge className={status.color}>
                      {status.label}
                    </Badge>
                  </div>
                  <Button
                    variant={day.isWorking ? "outline" : "default"}
                    onClick={() => toggleWorkingDay(day.day)}
                    className={day.isWorking ? "border-red-300 text-red-600 hover:bg-red-50" : ""}
                  >
                    {day.isWorking ? "Desactivar" : "Activar"}
                  </Button>
                </div>
              </CardHeader>
              
              {day.isWorking && (
                <CardContent>
                  <div className="space-y-4">
                    {/* Existing Time Slots */}
                    {day.timeSlots.map((slot) => (
                      <div key={slot.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">
                            {slot.startTime} - {slot.endTime}
                          </span>
                          <Badge 
                            variant={slot.isAvailable ? "default" : "secondary"}
                            className={slot.isAvailable ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}
                          >
                            {slot.isAvailable ? "Disponible" : "No disponible"}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleTimeSlotAvailability(day.day, slot.id)}
                          >
                            {slot.isAvailable ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <X className="w-4 h-4 text-gray-600" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTimeSlot(day.day, slot.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    {/* Add New Time Slot */}
                    {editingDay === day.day ? (
                      <div className="p-4 border border-dashed border-gray-300 rounded-lg">
                        <div className="flex items-center space-x-4 mb-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Hora de inicio
                            </label>
                            <input
                              type="time"
                              value={newTimeSlot.startTime}
                              onChange={(e) => setNewTimeSlot(prev => ({ ...prev, startTime: e.target.value }))}
                              className="border border-gray-300 rounded px-3 py-2"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Hora de fin
                            </label>
                            <input
                              type="time"
                              value={newTimeSlot.endTime}
                              onChange={(e) => setNewTimeSlot(prev => ({ ...prev, endTime: e.target.value }))}
                              className="border border-gray-300 rounded px-3 py-2"
                            />
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => addTimeSlot(day.day)}
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            Agregar Horario
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingDay(null)}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => setEditingDay(day.day)}
                        className="w-full border-dashed border-gray-300 text-gray-600 hover:border-purple-300 hover:text-purple-600"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Agregar Horario
                      </Button>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Summary */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-purple-600" />
            <span>Resumen de Disponibilidad</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {schedule.filter(d => d.isWorking && d.timeSlots.length > 0).length}
              </div>
              <div className="text-sm text-gray-600">Días Activos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {schedule.reduce((total, day) => total + day.timeSlots.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Horarios Totales</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {schedule.reduce((total, day) => 
                  total + day.timeSlots.filter(slot => slot.isAvailable).length, 0
                )}
              </div>
              <div className="text-sm text-gray-600">Horarios Disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                {schedule.reduce((total, day) => 
                  total + day.timeSlots.filter(slot => !slot.isAvailable).length, 0
                )}
              </div>
              <div className="text-sm text-gray-600">Horarios Bloqueados</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Availability;
