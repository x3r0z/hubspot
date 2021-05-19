import {IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Min, ValidateNested} from "class-validator";

export class InvoiceItemsDto {
    @IsNotEmpty()
    @IsNumber()
    item: number;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;
}

export class InvoiceDto {
    @IsNotEmpty()
    companyName: string;

    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    @IsUrl()
    companyWebsite: string;

    @IsOptional()
    @IsString()
    companyAddress?: string;

    @IsOptional()
    @IsString()
    companyCSZ?: string;

    @IsOptional()
    @IsString()
    companyCountry?: string;

    @IsNotEmpty()
    companyPhone: string;

    @IsNotEmpty()
    @IsEmail()
    companyEmail: string;

    @IsNotEmpty()
    clientCompany: string;

    @IsNotEmpty()
    clientName: string;

    @IsOptional()
    @IsString()
    clientAddress?: string;

    @IsOptional()
    @IsString()
    clientCSZ?: string;

    @IsOptional()
    @IsString()
    clientCountry?: string;

    @IsNotEmpty()
    invoiceNo: string;

    @IsNotEmpty()
    invoiceDate: Date;

    @IsNotEmpty()
    invoiceDueDate: Date;

    @IsOptional()
    @IsString()
    invoiceNotes: string;

    @IsNotEmpty()
    @Min(0)
    invoiceSubtotal: number;

    @IsNotEmpty()
    @Min(0)
    invoiceTax: number;

    @IsNotEmpty()
    @Min(0)
    invoiceDiscount: number;

    @IsNotEmpty()
    @Min(0)
    invoiceTotal: number;

    @IsOptional()
    @ValidateNested()
    items: InvoiceItemsDto[];
}
