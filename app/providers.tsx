// 'use client';

// import { getQueryClient } from "@/lib/get-query-client";
// import { QueryClientProvider } from '@tanstack/react-query';
// import { ReactNode } from 'react';

// export function Providers({ children }: { children: ReactNode }) {
//     const queryClient = getQueryClient();

//     return (
//         <QueryClientProvider client={queryClient}>
//             {children}
//         </QueryClientProvider>
//     );
// }

'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

export function ReactQueryProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
