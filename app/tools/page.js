// 'use client';
// import { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useAppContext } from '../Context/AppContext';
// import ToolCard from '../../components/shared/ToolCard';
// import { useTranslation } from 'react-i18next';

// const AllTools = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const { allTools, searchQuery } = useAppContext();
//   const [filteredTools, setFilteredTools] = useState([]);
//   const { t } = useTranslation('common');

//   // Client-side authentication check
//   useEffect(() => {
//     if (status === 'loading') return; // Still loading
//     if (!session) {
//       router.push('/auth/signin?callbackUrl=/tools');
//       return;
//     }
//   }, [session, status, router]);

//   useEffect(() => {
//     if (searchQuery.length > 0) {
//       setFilteredTools(
//         allTools.filter((tool) =>
//           tool.name.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//       );
//     } else {
//       setFilteredTools(allTools);
//     }
//   }, [allTools, searchQuery]);

//   // Show loading while checking authentication
//   if (status === 'loading') {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   // Don't render if not authenticated (will redirect)
//   if (!session) {
//     return null;
//   }

//   return (
//     <main
//       className="mt-2 md:mt-8 flex flex-col px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-6"
//       role="main"
//       aria-labelledby="all-tools-heading"
//     >
//       <header className="flex flex-col items-end self-start">
//         <h1
//           id="all-tools-heading"
//           className="text-2xl md:text-3xl font-semibold uppercase"
//         >
//           {t('allToolsHead')}
//         </h1>
//         <div className="w-24 h-0.5 bg-primary rounded-full mt-1"></div>
//       </header>

//       <section
//         role="list"
//         aria-label={t('allToolsHead')}
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8 w-full"
//       >
//         {filteredTools && filteredTools.length > 0 ? (
//           filteredTools
//             .filter((tool) => tool.name)
//             .map((tool, index) => (
//               <ToolCard
//                 key={index}
//                 tool={tool}
//                 role="listitem"
//                 aria-label={tool.name}
//               />
//             ))
//         ) : (
//           <p
//             className="col-span-full text-center text-gray-600 text-base md:text-lg"
//             role="status"
//           >
//             {t('noToolsFound')}
//           </p>
//         )}
//       </section>
//     </main>
//   );
// };

// export default AllTools;


import AllToolsPage from '../../components/pages/AllToolsPage';

export default function ToolsPage() {
  return <AllToolsPage />;
}
