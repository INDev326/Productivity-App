import type { ReactNode } from "react";
import { Drawer } from "vaul";
import { cn } from "@/lib/utils";

export function Sheet({
  open,
  onOpenChange,
  title,
  children,
  wide,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} shouldScaleBackground={false}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-ink/35 dark:bg-ink/55" />
        <Drawer.Content
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 mx-auto flex max-h-[92vh] flex-col rounded-t-3xl bg-surface shadow-card outline-none",
            wide ? "max-w-2xl" : "max-w-lg",
          )}
        >
          <div className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-border-strong" />
          <Drawer.Title className="px-5 pt-4 font-display text-2xl text-fg">{title}</Drawer.Title>
          <div className="folio-scroll mt-3 flex-1 overflow-y-auto px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
