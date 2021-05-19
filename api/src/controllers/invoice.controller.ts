import {
    Body,
    Controller, Delete,
    Get,
    Param,
    Post,
    Put,
    Request,
    UnauthorizedException,
    UseGuards
} from '@nestjs/common';
import {InvoiceService} from "../services/invoice.service";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import {InvoiceDto} from "../dto/invoice.dto";
import {UserService} from "../services/user.service";

@Controller('invoice')
@UseGuards(JwtAuthGuard)
export class InvoiceController {
    constructor(
        private readonly _invoiceService: InvoiceService,
        private readonly _userService: UserService,
        ) {}

    @Post()
    async create(@Request() req, @Body() data: InvoiceDto): Promise<any> {
        const user = await this._userService.get(req.user.userId);
        return await this._invoiceService.create({...data, ...{user}});
    }

    @Get()
    async getAll(@Request() req): Promise<any> {
        return await this._invoiceService.getAllFromUser(req.user.userId);
    }

    @Get(':id')
    async get(@Request() req, @Param('id') id: string): Promise<any> {
        const invoice = await this._invoiceService.get(id);
        if (invoice.user.toString() !== req.user.userId) {
            throw new UnauthorizedException();
        }
        return invoice;
    }

    @Put(':id')
    async update(@Request() req, @Param('id') id: string, @Body() data: InvoiceDto): Promise<any> {
        const invoice = await this._invoiceService.get(id);
        if (invoice.user.toString() !== req.user.userId) {
            throw new UnauthorizedException();
        }
        return this._invoiceService.update(id, data);
    }

    @Delete(':id')
    async remove(@Request() req, @Param('id') id: string): Promise<any> {
        const invoice = await this._invoiceService.get(id);
        if (invoice.user.toString() !== req.user.userId) {
            throw new UnauthorizedException();
        }
        return await this._invoiceService.delete(id);
    }
}
