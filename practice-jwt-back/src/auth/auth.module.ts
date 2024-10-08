import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { UserRepository } from '../user/user.repository';
import { JwtService } from './services/jwt.service';
import { RedisService } from './services/redis.service';
import { UserEntity } from '../user/user.entity';
import { IAuthService } from './interfaces/auth.service.interface';
import { IUserRepository } from '../user/interfaces/user.repository.interface';
import { IJwtService } from './interfaces/jwt.service.interface';
import { IRedisService } from './interfaces/redis.service.interface';
import { JwtStrategy } from './jwt.strategy';
import { IJwtStrategy } from './interfaces/jwt.strategy.interface';
import { typeOrmConfig } from '../config/database.config';
import { redisConfig } from '../config/redis.config';
import { BcryptService } from './services/bcrypt.service';
import { IbcryptService } from './interfaces/bcrypt.service.interface';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: IAuthService,
      useClass: AuthService,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IJwtService,
      useClass: JwtService,
    },
    {
      provide: IJwtStrategy,
      useClass: JwtStrategy,
    },
    {
      provide: IRedisService,
      useClass: RedisService,
    },
    {
      provide: IbcryptService,
      useClass: BcryptService,
    },
    {
      provide: 'JWT_SECRET',
      useValue: process.env.JWT_SECRET,
    },
    {
      provide: 'REDIS_OPTIONS',
      useValue: redisConfig,
    },
  ],
})
export class AuthModule {}
