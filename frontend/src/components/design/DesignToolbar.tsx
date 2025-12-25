import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  MousePointer2, 
  Square, 
  Circle, 
  Type, 
  Box,
  Component,
  Download
} from "lucide-react";
import { DesignTool } from "./DesignCanvas";

interface DesignToolbarProps {
  activeTool: DesignTool;
  onToolClick: (tool: DesignTool) => void;
  onExportToFigma: () => void;
}

export const DesignToolbar = ({ activeTool, onToolClick, onExportToFigma }: DesignToolbarProps) => {
  const tools = [
    { id: "select" as DesignTool, icon: MousePointer2, label: "Select" },
    { id: "frame" as DesignTool, icon: Box, label: "Frame" },
    { id: "rectangle" as DesignTool, icon: Square, label: "Rectangle" },
    { id: "circle" as DesignTool, icon: Circle, label: "Circle" },
    { id: "text" as DesignTool, icon: Type, label: "Text" },
    { id: "component" as DesignTool, icon: Component, label: "Component" },
  ];

  return (
    <div className="flex items-center gap-2 border-b bg-background p-3">
      <div className="flex items-center gap-1">
        {tools.map((tool) => (
          <Button
            key={tool.id}
            variant={activeTool === tool.id ? "secondary" : "ghost"}
            size="icon"
            onClick={() => onToolClick(tool.id)}
            title={tool.label}
          >
            <tool.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>
      
      <Separator orientation="vertical" className="h-8 mx-2" />
      
      <Button 
        variant="default" 
        size="sm" 
        onClick={onExportToFigma}
        className="ml-auto"
      >
        <Download className="h-4 w-4 mr-2" />
        Export to Figma
      </Button>
    </div>
  );
};
