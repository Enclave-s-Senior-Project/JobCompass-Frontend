import { AuthAxios } from '@/lib/axios';
import { ApiResponse, DetailedRequest } from '@/types';
import { handleErrorApi } from '.';

const authAxios = new AuthAxios('reports');

export class ReportService {
    public static async postReport(data: DetailedRequest.PostReport): Promise<Report | undefined> {
        try {
            console.log('data', data);
            const dataResponse = await authAxios.post<ApiResponse<Report>>('/', data);
            return dataResponse.payload.value;
        } catch (err) {
            handleErrorApi(err);
            return undefined;
        }
    }
    public static async getAll(query: ReportFilterDto): Promise<ReportResponseDto> {
        try {
            const dataResponse = await authAxios.get<ApiResponse<ReportResponseDto>>(`/`, { params: query });
            if (!dataResponse.payload.value) {
                return {
                    value: [],
                    total: 0,
                    success: false,
                };
            }
            return dataResponse.payload.value;
        } catch (err) {
            handleErrorApi(err);
            return {
                value: [],
                total: 0,
                success: false,
            };
        }
    }
}
