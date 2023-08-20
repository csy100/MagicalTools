/**
 * 路径
 */
export const BASE_URL = 'http://38.47.121.199:9999'; // 修改为你的实际接口地址
// export const BASE_URL = 'http://127.0.0.1:9999'; // 修改为你的实际接口地址


/**
 * Login结果集
 */
export interface ResponseData {
    success: boolean;
    error: string;
    data: any;
}

/**
 * User信息
 */
export interface UserDto {
    id: number;
    email: string;
    nickName: string;
    icon: string;
}

/**
 * ChatSetting信息
 */
export interface ChatSetting {
    model: string
    n: number // 上下文长度
    frequencyPenalty: number
    presencePenalty: number
    maxTokens: number
    temperature: number
    rolePlay: string
}