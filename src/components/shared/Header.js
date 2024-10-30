import React, { useState } from 'react';
import {
    Bell, User, Settings, LogOut, ChevronRight
} from 'lucide-react';
import { cn } from "../../utils/utils";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";

const NotificationCenter = () => {
    const [notifications] = useState([
        { id: 1, text: "Nova mensagem recebida", isNew: true },
        { id: 2, text: "Atualização do sistema disponível", isNew: true },
        { id: 3, text: "Backup realizado com sucesso", isNew: false },
    ]);

    const unreadCount = notifications.filter(n => n.isNew).length;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                        >
                            {unreadCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notification) => (
                    <DropdownMenuItem
                        key={notification.id}
                        className="flex items-start gap-2 p-3"
                    >
                        {notification.isNew && (
                            <Badge variant="secondary" className="mt-0.5">
                                Novo
                            </Badge>
                        )}
                        <span className="text-sm">{notification.text}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const UserMenu = () => {
    const menuItems = [
        { title: 'Perfil', icon: User },
        { title: 'Configurações', icon: Settings },
        { title: 'Sair', icon: LogOut, variant: 'destructive' }
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                    <User className="h-5 w-5" />
                    <span className="hidden md:block">John Doe</span>
                    <ChevronRight className="h-4 w-4 opacity-50 rotate-90" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {menuItems.map((item) => (
                    <DropdownMenuItem
                        key={item.title}
                        className={cn(
                            item.variant === 'destructive' && "text-red-600"
                        )}
                    >
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const Header = () => {
    return (
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-4 gap-4">
                <div className="flex items-center gap-2 flex-1">
                    <h1 className="text-xl font-bold hidden md:block">Dashboard</h1>
                    <h1 className="text-xl font-bold md:hidden">DB</h1>
                </div>
                <div className="flex items-center gap-4">
                    <NotificationCenter />
                    <UserMenu />
                </div>
            </div>
        </header>
    );
};

export default Header;