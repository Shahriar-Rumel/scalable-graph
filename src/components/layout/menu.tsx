import { Card, CardContent } from '../ui/card';

const Menu = () => {
  return (
    <Card className="z-[999]">
      <CardContent className="flex items-center justify-center pb-0 h-[50px] md:h-[100px]">
        <p className="uppercase text-foreground/40 font-[600]">Menu</p>
      </CardContent>
    </Card>
  );
};

export default Menu;
