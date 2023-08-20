/**
 * session
 */
export interface session {
    sessionId: string
    sessionTitle: string
}

/**
 * chatDialogue
 */
export interface chatDialogue {
    chatType: number
    chatContent: string
    createTime: string
}