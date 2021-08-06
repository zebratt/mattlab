import fetch from '@/utils/fetch';
import type { RawTreeItem } from './interface';

interface GetFileResponse {
  mocks: unknown;
  middleware: string;
}

interface CommonResult {
  success: boolean;
  message?: string;
}

export function getFile(
  filename: string,
  branch: string,
): Promise<GetFileResponse> {
  return fetch()(
    `${import.meta.env.VITE_API_HOST}/_admin/read/${branch}/${filename}`,
  );
}

export function writeFile(
  filename: string,
  content: Record<string, unknown>,
  branch: string,
): Promise<CommonResult> {
  return fetch({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  })(`${import.meta.env.VITE_API_HOST}/_admin/write/${branch}/${filename}`);
}

export function getFileTree(branch: string): Promise<RawTreeItem[]> {
  return fetch()(`${import.meta.env.VITE_API_HOST}/_admin/tree/${branch}`);
}

export function addFile(filename: string, branch: string): Promise<CommonResult> {
  return fetch()(
    `${import.meta.env.VITE_API_HOST}/_admin/tree/add/${branch}/${filename}`,
  );
}

export function deleteFile(filename: string, branch: string): Promise<CommonResult> {
  return fetch()(
    `${import.meta.env.VITE_API_HOST}/_admin/tree/delete/${branch}/${filename}`,
  );
}

export function getBranches(): Promise<string[]> {
  return fetch()(`${import.meta.env.VITE_API_HOST}/_admin/branches`);
}

export function createBranch(branch: string): Promise<CommonResult> {
  return fetch()(
    `${import.meta.env.VITE_API_HOST}/_admin/branches/create/${branch}`,
  );
}
