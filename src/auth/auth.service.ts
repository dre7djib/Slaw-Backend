import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/auth-login.dto';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findUserByEmail(loginDto.email);
    console.log(user.email, loginDto.email);
    if (user.email !== loginDto.email) {
      throw new UnauthorizedException();
    }
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  verifyToken(token: string) {
    const decoded = this.jwtService.verify(token);
    const userId = decoded.userId; 

    if (this.usersService.findOneUser(userId)) {
      return userId;
    }
    return false;
  }
} 
