import { Column, Entity, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

@Entity('Categorias_producto')
export class CategoriasProducto {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 15 })
  nombre: string;

  @DeleteDateColumn({ type: 'timestamp' ,name: 'fecha_eliminacion', select: false }) 
  deletedAt?: Date;
}
