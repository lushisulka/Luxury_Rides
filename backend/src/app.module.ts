
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { BookingModule } from './booking/booking.module';
import { UserEntity } from './users/entity/user.entity';
import { VehicleEntity } from './vehicles/entity/vehicle.entity';
import { BookingEntity } from './booking/entity/booking.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [UserEntity, VehicleEntity, BookingEntity],
        synchronize: true,
      }),
    }),
    UsersModule,
    AuthModule,
    VehiclesModule,
    BookingModule,
  ],
})
export class AppModule { }
