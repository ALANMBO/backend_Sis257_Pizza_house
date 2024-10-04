import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('empleados')
export class Empleado {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 20 })
  nombre: string;

  @Column('varchar', { length: 50 })
  email: string;

  @Column('varchar', { length: 30 })
  cargo: string;

  @Column('numeric')
  telefono: number;

  @Column('numeric')
  salario: number;

  @Column('date')
  fecha_nacimiento: Date;
  @DeleteDateColumn({
    type: 'timestamp',
    name: 'fecha_eliminacion',
    select: false,
  })
  deletedAt?: Date;
}