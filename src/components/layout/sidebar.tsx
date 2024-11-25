import { Card, CardContent } from '../ui/card';

const Sidebar = () => {
  return (
    <Card className="min-w-[200px] hidden md:block max-w-[300px] min-h-[95vh] z-[999]">
      <CardContent className="flex flex-col h-full items-center justify-center">
        <p className="uppercase rotate-[90deg] text-foreground/40 font-[600]">
          Sidebar
        </p>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
