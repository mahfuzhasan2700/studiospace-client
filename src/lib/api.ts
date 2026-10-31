import { Studio, StudioDetail, StudioFilterParams } from '../types/studio';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return ''; // browser uses relative same-origin proxy /api/*
  }
  return process.env.SERVER_URL || 'http://localhost:5000';
};

export async function fetchStudios(params: StudioFilterParams = {}): Promise<{
  data: Studio[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}> {
  const query = new URLSearchParams();
  if (params.category) query.set('category', params.category);
  if (params.search) query.set('search', params.search);
  if (params.sort) query.set('sort', params.sort);
  if (params.page) query.set('page', params.page.toString());
  if (params.limit) query.set('limit', params.limit.toString());

  const url = `${getBaseUrl()}/api/studios?${query.toString()}`;
  const res = await fetch(url, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch studios (${res.status})`);
  }

  const json = await res.json();
  return {
    data: json.data || [],
    meta: json.meta || { page: 1, limit: 12, total: 0, totalPages: 1 }
  };
}

export async function fetchFeaturedStudios(limit = 6): Promise<Studio[]> {
  const url = `${getBaseUrl()}/api/studios/featured?limit=${limit}`;
  const res = await fetch(url, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch featured studios (${res.status})`);
  }

  const json = await res.json();
  return json.data || [];
}

export async function fetchStudioById(id: string): Promise<StudioDetail> {
  const url = `${getBaseUrl()}/api/studios/${id}`;
  const res = await fetch(url, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch studio ${id} (${res.status})`);
  }

  const json = await res.json();
  return json.data;
}
