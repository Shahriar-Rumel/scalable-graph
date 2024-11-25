import { useReactFlow, useStoreApi } from '@xyflow/react';
import React, { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '../ui/command';
import { cn } from '../../lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '../ui/button';
import { AppNode } from '@/types/nodes';
import Box from '../layout/box';

interface SearchNodesProps {
  setSelectedNodeId: (nodeId: string) => void;
}

const SearchNodes: React.FC<SearchNodesProps> = ({ setSelectedNodeId }) => {
  const store = useStoreApi();
  const { setCenter } = useReactFlow();
  const [graphNodes, setGraphNodes] = useState<AppNode[]>([]);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const focusNode = (query: string) => {
    const { nodeLookup } = store.getState();
    const nodes = Array.from(nodeLookup).map(([, node]) => node);

    const filteredNodes = nodes.filter((_x) =>
      _x?.data.label.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );

    const transformedNodes: AppNode[] = filteredNodes.map((node) => ({
      id: node.id,
      position: node.position,
      measured: {
        width: node.measured?.width || undefined,
        height: node.measured?.height || undefined
      },
      data: {
        label:
          typeof node.data?.label === 'string'
            ? node.data.label
            : 'Unnamed Node',
        status:
          typeof node.data?.status === 'string' ? node.data.status : undefined,
        description:
          typeof node.data?.description === 'string'
            ? node.data.description
            : undefined
      }
    }));

    if (transformedNodes.length > 0) {
      const node = transformedNodes[0];

      const x = node.position.x + node.measured.width / 2;
      const y = node.position.y + node.measured.height / 2;
      const zoom = 1.85;

      setCenter(x, y, { zoom, duration: 1000 });
    } else {
      console.warn(`Node with query "${query}" not found.`);
    }
  };

  useEffect(() => {
    const initializeNodes = () => {
      const { nodeLookup } = store.getState();
      const nodes = Array.from(nodeLookup).map(([, node]) => node);

      const transformedNodes: AppNode[] = nodes.map((node) => ({
        id: node.id,
        position: node.position,
        measured: {
          width: node.measured?.width || undefined,
          height: node.measured?.height || undefined
        },
        data: {
          label:
            typeof node.data?.label === 'string'
              ? node.data.label
              : 'Unnamed Node',
          status:
            typeof node.data?.status === 'string'
              ? node.data.status
              : undefined,
          description:
            typeof node.data?.description === 'string'
              ? node.data.description
              : undefined
        }
      }));

      setGraphNodes(transformedNodes);
    };

    initializeNodes();
  }, [open, store]);

  return (
    <Box className="absolute z-[999] left-4 top-[30px]">
      <Box className="relative ">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[250px]  md:w-[300px] h-[46px] justify-between"
            >
              {value ? value : 'Search Node'}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] md:w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Search node..." />
              <CommandList>
                <CommandEmpty>No node found.</CommandEmpty>
                <CommandGroup>
                  {graphNodes?.map((node: AppNode) => {
                    const { data, id } = node;
                    return (
                      <CommandItem
                        key={data.label}
                        value={data.label}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? '' : currentValue);
                          setOpen(false);
                          focusNode(currentValue);
                          setSelectedNodeId(id);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            value === data.label ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        {data.label}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </Box>
    </Box>
  );
};

export default SearchNodes;
