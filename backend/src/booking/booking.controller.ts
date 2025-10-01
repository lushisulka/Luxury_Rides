import { Controller, Get, Post, Param, Body, Delete, Put } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingEntity } from './entity/booking.entity';
import { CreateBookDto } from './DTO/bookCar.dto';

@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    @Post('car')
    public async create(@Body() body: CreateBookDto): Promise<any> {
        try {
            const result = await this.bookingService.createBooking(body);
            return { status: 200, data: result }
        } catch (error) {

        }
    }

    @Get('all')
    findAll(): Promise<BookingEntity[]> {
        return this.bookingService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<BookingEntity> {
        return this.bookingService.findOne(id);
    }

    @Put('confirm/:id')
    acceptOrDeclineOffer(@Param('id') id: number): Promise<BookingEntity> {
        return this.bookingService.confirmBooking(id);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.bookingService.removeBooking(id);
    }

    @Get('history/:id')
    async getUserHistory(@Param('id') id: number) {
        return this.bookingService.findBookingsByUser(id);
    }
}
