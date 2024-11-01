import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasProductosModule } from './categorias_productos/categorias_productos.module';
import { ClientesModule } from './clientes/clientes.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { IngredientesModule } from './ingredientes/ingredientes.module';
import { PromocionesModule } from './promociones/promociones.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { ProductosModule } from './productos/productos.module';
import { DetallePedidoModule } from './detalle_pedido/detalle_pedido.module';
import { MetodosPagosModule } from './metodos_pagos/metodos_pagos.module';
import { ProductosIngredientesModule } from './productos_ingredientes/productos_ingredientes.module';
import { UsuarioModule } from './usuarios/usuario.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '*/**/entities/*.{ts|js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    CategoriasProductosModule,
    ClientesModule,
    EmpleadosModule,
    IngredientesModule,
    PromocionesModule,
    PedidosModule,
    ProductosModule,
    DetallePedidoModule,
    MetodosPagosModule,
    ProductosIngredientesModule,
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
