import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
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
  private readonly logger = new Logger(AuthService.name);

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    this.logger.log('Logging in');
    const user = await this.usersService.findUserByEmail(loginDto.email);
    if (user.email !== loginDto.email) {
      throw new UnauthorizedException();
    }
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  verifyToken(token: string) {
    this.logger.log('Verifying token');
    const decoded = this.jwtService.verify(token);
    const sub = decoded.sub;

    if (this.usersService.findOneUser(sub)) {
      return sub;
    }
    return false;
  }
} 
