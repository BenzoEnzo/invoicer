import axios from 'axios';
import {InvoiceDTO} from '../model/InvoiceDTO'
import {ProductDTO} from "../../product/model/ProductDTO";

const API_INVOICE_URL = '/api/invoices';

class InvoiceAPI {
    async getSellerInvoices(sellerId: number): Promise<InvoiceDTO[]> {
        try {
            const response = await axios.get<InvoiceDTO[]>(`${API_INVOICE_URL}/seller/${sellerId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async generateInvoice(id: number | undefined): Promise<Blob> {
        try {
            const response = await axios.get(`${API_INVOICE_URL}/${id}`, {
                responseType: 'arraybuffer',
                headers: {
                    'Accept': 'application/pdf',
                },
            });
            return new Blob([response.data], {type: 'application/pdf'});
        } catch (error) {
            throw error;
        }
    }

    async createInvoice(invoice: InvoiceDTO): Promise<InvoiceDTO> {
        try {
            const response = await axios.post<ProductDTO>(API_INVOICE_URL, invoice);
            return response.data;
        } catch (error) {
            // More specific error handling (optional)
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(`API Error: ${error.response.status} - ${error.response.data}`);
            } else {
                throw error;
            }
        }
    }

}

export default new InvoiceAPI();