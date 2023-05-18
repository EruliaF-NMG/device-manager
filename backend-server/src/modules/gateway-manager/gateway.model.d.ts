
import { IGateway } from './entities/gateway.entity';

export type PagingGateway = {
    current_page: number,
    total_pages: number
    data: Array<IGateway>,
    total_items: number,
    page_size: number,
}