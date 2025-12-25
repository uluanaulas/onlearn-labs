import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Rect, Circle, IText, FabricObject } from "fabric";
import { DesignToolbar } from "./DesignToolbar";
import { LayersPanel } from "./LayersPanel";
import { toast } from "sonner";

export type DesignTool = "select" | "frame" | "rectangle" | "circle" | "text" | "component";

export const DesignCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeTool, setActiveTool] = useState<DesignTool>("select");
  const [layers, setLayers] = useState<FabricObject[]>([]);
  const [selectedLayer, setSelectedLayer] = useState<FabricObject | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: window.innerWidth - 400,
      height: window.innerHeight - 120,
      backgroundColor: "#F5F5F5",
    });

    setFabricCanvas(canvas);

    canvas.on("object:added", () => updateLayers(canvas));
    canvas.on("object:removed", () => updateLayers(canvas));
    canvas.on("object:modified", () => updateLayers(canvas));
    canvas.on("selection:created", (e) => setSelectedLayer(e.selected?.[0] || null));
    canvas.on("selection:updated", (e) => setSelectedLayer(e.selected?.[0] || null));
    canvas.on("selection:cleared", () => setSelectedLayer(null));

    toast.success("Design canvas ready!");

    return () => {
      canvas.dispose();
    };
  }, []);

  const updateLayers = (canvas: FabricCanvas) => {
    const objects = canvas.getObjects();
    setLayers([...objects]);
  };

  const handleToolClick = (tool: DesignTool) => {
    setActiveTool(tool);

    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = false;

    if (tool === "frame") {
      const frame = new Rect({
        left: 100,
        top: 100,
        fill: "transparent",
        stroke: "#000000",
        strokeWidth: 2,
        width: 400,
        height: 600,
        rx: 8,
        ry: 8,
      });
      frame.set({ name: "Frame" } as any);
      fabricCanvas.add(frame);
      fabricCanvas.setActiveObject(frame);
    } else if (tool === "rectangle") {
      const rect = new Rect({
        left: 150,
        top: 150,
        fill: "#6366F1",
        width: 200,
        height: 150,
        rx: 4,
        ry: 4,
      });
      rect.set({ name: "Rectangle" } as any);
      fabricCanvas.add(rect);
      fabricCanvas.setActiveObject(rect);
    } else if (tool === "circle") {
      const circle = new Circle({
        left: 150,
        top: 150,
        fill: "#10B981",
        radius: 75,
      });
      circle.set({ name: "Circle" } as any);
      fabricCanvas.add(circle);
      fabricCanvas.setActiveObject(circle);
    } else if (tool === "text") {
      const text = new IText("Text Layer", {
        left: 150,
        top: 150,
        fontSize: 24,
        fill: "#000000",
        fontFamily: "Inter",
      });
      text.set({ name: "Text" } as any);
      fabricCanvas.add(text);
      fabricCanvas.setActiveObject(text);
    } else if (tool === "component") {
      const component = new Rect({
        left: 150,
        top: 150,
        fill: "#8B5CF6",
        width: 150,
        height: 100,
        rx: 8,
        ry: 8,
      });
      component.set({ name: "Component" } as any);
      fabricCanvas.add(component);
      fabricCanvas.setActiveObject(component);
    }

    fabricCanvas.renderAll();
  };

  const handleExportToFigma = () => {
    if (!fabricCanvas) return;
    
    const json = fabricCanvas.toJSON();
    const dataStr = JSON.stringify(json, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "design-export.json";
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success("Design exported! Import this file in Figma");
  };

  const handleLayerSelect = (layer: FabricObject) => {
    if (!fabricCanvas) return;
    fabricCanvas.setActiveObject(layer);
    fabricCanvas.renderAll();
  };

  const handleLayerDelete = (layer: FabricObject) => {
    if (!fabricCanvas) return;
    fabricCanvas.remove(layer);
    fabricCanvas.renderAll();
  };

  const handleLayerVisibilityToggle = (layer: FabricObject) => {
    layer.visible = !layer.visible;
    fabricCanvas?.renderAll();
    updateLayers(fabricCanvas!);
  };

  return (
    <div className="flex h-full w-full">
      <div className="flex-1 flex flex-col">
        <DesignToolbar 
          activeTool={activeTool} 
          onToolClick={handleToolClick}
          onExportToFigma={handleExportToFigma}
        />
        <div className="flex-1 bg-muted/20 p-4 overflow-auto">
          <canvas ref={canvasRef} className="shadow-lg" />
        </div>
      </div>
      <LayersPanel 
        layers={layers}
        selectedLayer={selectedLayer}
        onLayerSelect={handleLayerSelect}
        onLayerDelete={handleLayerDelete}
        onLayerVisibilityToggle={handleLayerVisibilityToggle}
      />
    </div>
  );
};
