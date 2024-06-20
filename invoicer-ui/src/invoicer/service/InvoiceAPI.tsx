import axios from 'axios';
import {InvoiceDTO} from '../model/InvoiceDTO'

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
}

export default new InvoiceAPI();