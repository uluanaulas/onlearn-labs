import { FabricObject } from "fabric";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, EyeOff, Trash2, Square, Circle, Type, Box, Component } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayersPanelProps {
  layers: FabricObject[];
  selectedLayer: FabricObject | null;
  onLayerSelect: (layer: FabricObject) => void;
  onLayerDelete: (layer: FabricObject) => void;
  onLayerVisibilityToggle: (layer: FabricObject) => void;
}

export const LayersPanel = ({ 
  layers, 
  selectedLayer, 
  onLayerSelect, 
  onLayerDelete,
  onLayerVisibilityToggle 
}: LayersPanelProps) => {
  
  const getLayerIcon = (layer: FabricObject) => {
    const type = layer.type;
    const name = (layer as any).name || "";
    
    if (name === "Frame") return Box;
    if (name === "Component") return Component;
    if (type === "rect" || type === "Rect") return Square;
    if (type === "circle" || type === "Circle") return Circle;
    if (type === "i-text" || type === "IText" || type === "text") return Type;
    
    return Square;
  };

  const getLayerName = (layer: FabricObject, index: number) => {
    return (layer as any).name || `Layer ${layers.length - index}`;
  };

  return (
    <div className="w-80 border-l bg-background flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-sm">Layers</h3>
        <p className="text-xs text-muted-foreground mt-1">
          {layers.length} {layers.length === 1 ? 'layer' : 'layers'}
        </p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {layers.length === 0 ? (
            <div className="text-center py-8 text-sm text-muted-foreground">
              No layers yet. Start designing!
            </div>
          ) : (
            layers.slice().reverse().map((layer, index) => {
              const Icon = getLayerIcon(layer);
              const isSelected = selectedLayer === layer;
              
              return (
                <div
                  key={index}
                  className={cn(
                    "flex items-center gap-2 p-2 rounded-md cursor-pointer group hover:bg-muted/50",
                    isSelected && "bg-muted"
                  )}
                  onClick={() => onLayerSelect(layer)}
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1 text-sm truncate">
                    {getLayerName(layer, index)}
                  </span>
                  
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        onLayerVisibilityToggle(layer);
                      }}
                    >
                      {layer.visible !== false ? (
                        <Eye className="h-3 w-3" />
                      ) : (
                        <EyeOff className="h-3 w-3" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        onLayerDelete(layer);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
