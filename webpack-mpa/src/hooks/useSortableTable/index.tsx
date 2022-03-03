import React, { useEffect, useMemo } from 'react';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Table } from 'infosysD';
import { TableProps } from 'infosysD/lib/table';

import './style.less';

const SortableContainerItem = SortableContainer((props: any) => (
  <tbody {...props} />
));
interface UseSortableTableProps<T> extends TableProps<T> {
  onSortChange: (data: T[]) => void;
  CustomRow?: (params: any) => JSX.Element;
  CustomCell?: (params: any) => JSX.Element;
}

function useSortableTable<R extends Record<string, unknown>>({
  dataSource: data = [],
  columns = [],
  rowKey,
  onSortChange,
  CustomRow,
  CustomCell,
  ...rest
}: UseSortableTableProps<R>) {
  const [dataSource, setDataSource] = useState(data);

  useEffect(() => {
    setDataSource(data);
  }, [data]);

  const SortableItem = useMemo(() => {
    if (CustomRow) {
      return SortableElement((props: any) => <CustomRow {...props} />);
    } else {
      return SortableElement((props: any) => <tr {...props} />);
    }
  }, [CustomRow]);

  const DragHandle = SortableHandle(() => (
    <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
  ));

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMove<R>(
        ([] as R[]).concat(dataSource),
        oldIndex,
        newIndex
      ).filter((el) => !!el);

      setDataSource(newData);
      onSortChange(newData);
    }
  };

  const DraggableContainer = (props: any) => (
    <SortableContainerItem
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow = ({ className, style, ...restProps }: any) => {
    const index = dataSource.findIndex(
      (x: R) => x[rowKey as string] === restProps['data-row-key']
    );
    return <SortableItem index={index} {...restProps} />;
  };

  return (
    <Table
      rowKey={rowKey}
      dataSource={dataSource}
      columns={[
        {
          title: '',
          dataIndex: 'sort',
          width: 30,
          className: 'drag-visible',
          render: () => <DragHandle />,
        },
        ...columns,
      ]}
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow,
          cell: CustomCell,
        },
      }}
      {...rest}
    />
  );
}

export default useSortableTable;
