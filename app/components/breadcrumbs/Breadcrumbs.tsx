import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import React, { useEffect, useRef } from "react";
import BreadcrumbItem from "./BreadcrumbsItem";
import BreadcrumbItemSeparator from "./BreadcrumbsItemSeparator";
import { useLocation } from "@remix-run/react";

interface BreadcrumbProps {
  className?: string;
  items: {
    id: string;
    name: string;
    slug: string;
  }[];
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ className, items }) => {
  const location = useLocation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollPositions = useRef<any>({});

  useEffect(() => {
    const container = scrollContainerRef.current;

    // Mentés a scrollpozícióról az útvonalváltás előtt
    const saveScrollPosition = () => {
      if (container) {
        scrollPositions.current["Breadcrumbs"] = container.scrollTop;
      }
    };

    // Visszaállítás az útvonalváltás után
    const restoreScrollPosition = () => {
      if (container) {
        const savedPosition = scrollPositions.current["Breadcrumbs"];
        if (savedPosition !== undefined) {
          container.scrollTo(0, savedPosition);
        }
      }
    };

    // Esemény hozzáadása az útvonalváltáskor
    window.addEventListener("beforeunload", saveScrollPosition);
    restoreScrollPosition();

    // Esemény eltávolítása
    return () => {
      window.removeEventListener("beforeunload", saveScrollPosition);
      saveScrollPosition();  // Save scroll position before unmounting
    };
  }, [location.pathname]);

  return (
    <div className={`${className ? `${className}` : ""}`}>
      <ScrollArea ref={scrollContainerRef} className='w-full whitespace-nowrap'>
        <div className='flex flex-nowrap items-center gap-2 pb-4'>
          {items.map((option, index: number) => (
            <React.Fragment key={index}>
              <div className='flex items-center gap-2'>
                <BreadcrumbItem
                  title={option.name}
                  // imageSrc={option.imageSrc}
                  link={option.slug}
                />
                {index < items.length - 1 && (
                  <BreadcrumbItemSeparator />
                )}
              </div>
            </React.Fragment>
          ))}
          {/* <BreadcrumbDropdownItem /> */}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  );
};

export default Breadcrumbs;
