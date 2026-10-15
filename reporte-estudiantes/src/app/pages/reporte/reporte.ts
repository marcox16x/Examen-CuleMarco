import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  Estudiante,
  EstudianteService
} from '../../services/estudiante';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reporte.html'
})
export class Reporte implements OnInit {
  estudiantes: Estudiante[] = [];
  cargando = true;
  error = '';

  constructor(private servicio: EstudianteService) { }

  ngOnInit(): void {
    console.log('1. Se inició la carga de estudiantes');

    this.servicio.obtenerEstudiantes().subscribe({
      next: (datos: Estudiante[]) => {
        console.log('2. Datos recibidos:', datos);
        this.estudiantes = datos;
        this.cargando = false;
      },
      error: (err: unknown) => {
        console.error('3. Error HTTP:', err);
        this.error = 'No se pudieron cargar los estudiantes.';
        this.cargando = false;
      }
    });
  }
}