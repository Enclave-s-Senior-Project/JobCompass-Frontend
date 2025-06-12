import { AuthAxios } from '@/lib/axios';
import { handleErrorApi } from '.';
import { DetailedRequest, DetailedResponse } from '@/types';

const authAxios = new AuthAxios('functions', process.env.NEXT_PUBLIC_APP_AI_SERVER);

export class AIService {
    static async conversation(payload: DetailedRequest.AIConversationRequest) {
        try {
            const response = await authAxios.post<DetailedResponse.AIConversationResponse>('/ask', payload);
            return response;
        } catch (error) {
            handleErrorApi(error);
        }
    }
}
