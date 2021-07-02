import React from 'react';

import type { StructureItem } from './interface';

interface PageProps {
  structures: StructureItem[];
}

function HomePage(props: PageProps) {
  console.log(props)
  return <div className="page-home">home page</div>;
}

export async function fetch(): Promise<PageProps> {
  return {
    structures: [],
  };
}

export default HomePage;
