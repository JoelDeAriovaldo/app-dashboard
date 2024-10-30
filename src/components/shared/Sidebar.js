import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    Home, Briefcase, Users, Settings, LogOut,
    ChevronRight, BarChart, FileText, MessageSquare,
    PanelRightClose, PanelRightOpen,
} from 'lucide-react';
import { cn } from "../../utils/utils";
import { Button } from "../ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";
import { Badge } from "../ui/badge";

const menuItems = [
    { title: 'Dashboard', icon: Home, path: '/' },
    {
        title: 'Vagas',
        icon: Briefcase,
        path: '/jobs',
        submenu: [
            { title: 'Listar Vagas', path: '/jobs/list' },
            { title: 'Criar Vaga', path: '/jobs/create' },
            { title: 'Estatísticas', path: '/jobs/stats' },
        ]
    },
    {
        title: 'Candidatos',
        icon: Users,
        path: '/candidates',
        submenu: [
            { title: 'Todos Candidatos', path: '/candidates/all' },
            { title: 'Avaliações', path: '/candidates/reviews' },
            { title: 'Pipeline', path: '/candidates/pipeline' },
        ]
    },
    { title: 'Relatórios', icon: BarChart, path: '/reports' },
    { title: 'Documentos', icon: FileText, path: '/documents' },
    { title: 'Mensagens', icon: MessageSquare, path: '/messages', badge: 3 }
];

const SidebarLink = ({ item, isSubmenuItem = false, expanded }) => {
    const location = useLocation();
    const active = location.pathname === item.path ||
        location.pathname.startsWith(item.path + '/');

    const linkContent = (
        <div
            className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                active ? "bg-primary text-primary-foreground" : "hover:bg-accent",
                isSubmenuItem && "pl-12",
                !expanded && !isSubmenuItem && "justify-center px-2"
            )}
        >
            {item.icon && (
                <item.icon className={cn("h-4 w-4", item.badge && "relative")} />
            )}
            {(expanded || isSubmenuItem) && (
                <>
                    <span className="flex-1">{item.title}</span>
                    {item.badge && (
                        <Badge
                            variant="primary"
                            className="h-5 w-5 flex items-center justify-center p-0"
                        >
                            {item.badge}
                        </Badge>
                    )}
                </>
            )}
        </div>
    );

    return expanded ? (
        <NavLink to={item.path} className="block">
            {linkContent}
        </NavLink>
    ) : (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <NavLink to={item.path} className="block">
                        {linkContent}
                    </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-2">
                    {item.title}
                    {item.badge && (
                        <Badge
                            variant="primary"
                            className="h-5 w-5 flex items-center justify-center p-0"
                        >
                            {item.badge}
                        </Badge>
                    )}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

const Sidebar = () => {
    const [expanded, setExpanded] = useState(true);
    const [openSubmenu, setOpenSubmenu] = useState('');

    const toggleSubmenu = (title) => {
        setOpenSubmenu(openSubmenu === title ? '' : title);
    };

    return (
        <div className={cn(
            "flex flex-col gap-4 border-r bg-background p-4 pt-0 h-screen sticky top-0",
            expanded ? "w-64" : "w-16",
            "transition-all duration-300"
        )}>
            <div className="flex h-14 items-center justify-between border-b sticky top-0 bg-background">
                {expanded && <h2 className="text-lg font-semibold">Dashboard</h2>}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setExpanded(!expanded)}
                    className="h-8 w-8 ml-auto"
                    aria-label={expanded ? "Recolher menu" : "Expandir menu"}
                >
                    {expanded ? (
                        <PanelRightClose className="h-4 w-4" />
                    ) : (
                        <PanelRightOpen className="h-4 w-4" />
                    )}
                </Button>
            </div>

            <nav className="flex flex-1 flex-col gap-1">
                {menuItems.map((item) => (
                    <div key={item.path}>
                        <div onClick={() => item.submenu && toggleSubmenu(item.title)}>
                            <SidebarLink item={item} expanded={expanded} />
                        </div>
                        {expanded &&
                            openSubmenu === item.title &&
                            item.submenu?.map((subItem) => (
                                <SidebarLink
                                    key={subItem.path}
                                    item={{
                                        ...subItem,
                                        icon: ChevronRight,
                                    }}
                                    isSubmenuItem
                                    expanded={expanded}
                                />
                            ))}
                    </div>
                ))}
            </nav>

            <div className="border-t pt-4 space-y-1">
                <NavLink to="/settings" className="block">
                    <div className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
                        !expanded && "justify-center px-2"
                    )}>
                        <Settings className="h-4 w-4" />
                        {expanded && <span>Configurações</span>}
                    </div>
                </NavLink>
                <Button
                    variant="ghost"
                    className={cn(
                        "w-full justify-start gap-3 text-red-600 hover:text-red-600 hover:bg-red-100",
                        !expanded && "justify-center"
                    )}
                >
                    <LogOut className="h-4 w-4" />
                    {expanded && <span>Sair</span>}
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;