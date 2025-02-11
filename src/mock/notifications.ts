import type { NotificationItem } from '@/types/notification'
import Mock from 'mockjs'

const notificationTypes = [
    { type: 'news', avatar: '/vb-logo.png', initial: 'VB', bgColor: '#67C23A', title: '收到了 @integer(1,20) 份新闻报' },
    { type: 'reply', avatar: '/avatar1.png', initial: '朱', bgColor: '#E6A23C', title: '回复了你' },
    { type: 'system', avatar: '/corgi-logo.png', initial: 'S', bgColor: '#409EFF', title: '系统通知' }
]

export const mockNotifications: NotificationItem[] = Mock.mock({
    'list|2-5': [{
        'id|+1': 1,
        'type|1': notificationTypes,
        avatar: function (options: any) {
            return options.context.currentContext.type.avatar
        },
        initial: function (options: any) {
            return options.context.currentContext.type.initial
        },
        bgColor: function (options: any) {
            return options.context.currentContext.type.bgColor
        },
        title: function (options: any) {
            return Mock.mock(options.context.currentContext.type.title)
        },
        description: '@sentence(10, 20)',
        time: '@pick(["刚刚", "1分钟前", "5分钟前", "10分钟前", "30分钟前", "1小时前", "2小时前", "3小时前", "昨天"])',
        unread: '@boolean'
    }]
}).list