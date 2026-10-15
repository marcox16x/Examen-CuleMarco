import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  Estudiante,
  EstudianteService
} from '../../services/estudiante';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle.html'
})
export class Detalle implements OnInit {
  estudiante: Estudiante | undefined;

  suma = 0;
  promedio = 0;
  estado = '';
  observacion = '';
  error = 'Cargando información del estudiante...';

  constructor(
    private ruta: ActivatedRoute,
    private servicio: EstudianteService
  ) {}

  ngOnInit(): void {
    const id = Number(this.ruta.snapshot.paramMap.get('id'));

    console.log('ID recibido en detalle:', id);

    this.servicio.obtenerEstudiantes().subscribe({
      next: (datos: Estudiante[]) => {
        console.log('Estudiantes recibidos:', datos);

        this.estudiante = datos.find(e => Number(e.id) === id);

        if (this.estudiante) {
          this.calcular();
          this.error = '';
          console.log('Estudiante encontrado:', this.estudiante);
        } else {
          this.error = `No se encontró el estudiante con ID ${id}.`;
          console.error(this.error);
        }
      },
      error: (err: unknown) => {
        console.error('Error HTTP:', err);
        this.error = 'No se pudieron cargar los datos del estudiante.';
      }
    });
  }

  calcular(): void {
    if (!this.estudiante) {
      return;
    }

    this.suma =
      Number(this.estudiante.nota1) +
      Number(this.estudiante.nota2) +
      Number(this.estudiante.nota3);

    this.promedio = this.suma / 3;

    this.estado = this.promedio >= 13
      ? 'Aprobado'
      : 'Desaprobado';

    if (this.promedio >= 17) {
      this.observacion = 'Excelente';
    } else if (this.promedio >= 13) {
      this.observacion = 'Regular';
    } else {
      this.observacion = 'En riesgo';
    }
  }
}
