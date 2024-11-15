import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';  
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const existe = await this.usuarioRepository.findOneBy({
      usuario: createUsuarioDto.usuario.trim(),
    });
    if (existe) {
      throw new ConflictException('El usuario ya existe con este nombre');
    }

    const salt = await bcrypt.genSalt(10);  
    const hashedPassword = await bcrypt.hash(createUsuarioDto.clave, salt);  

    const usuario = new Usuario();
    usuario.usuario = createUsuarioDto.usuario.trim();
    usuario.clave = hashedPassword; 
    usuario.tipoUsuario = createUsuarioDto.tipoUsuario.trim();

    return this.usuarioRepository.save(usuario);  
  }


  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }


  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException('El usuario no existe');
    }
    return usuario;
  }
  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    const usuario = await this.findOne(id);

    if (updateUsuarioDto.usuario && updateUsuarioDto.usuario !== usuario.usuario) {
      const existe = await this.usuarioRepository.findOneBy({
        usuario: updateUsuarioDto.usuario.trim(),
      });
      if (existe && existe.id !== id) {
        throw new ConflictException('Ya existe un usuario con este nombre');
      }
    }

    usuario.usuario = updateUsuarioDto.usuario?.trim() || usuario.usuario;

    if (updateUsuarioDto.clave) {
      const salt = await bcrypt.genSalt(10);
      usuario.clave = await bcrypt.hash(updateUsuarioDto.clave, salt);
    }

    usuario.tipoUsuario = updateUsuarioDto.tipoUsuario?.trim() || usuario.tipoUsuario;

    return this.usuarioRepository.save(usuario);  
  }
  async remove(id: number) {
    const usuario = await this.findOne(id);
    return this.usuarioRepository.softRemove(usuario);
  }
}
