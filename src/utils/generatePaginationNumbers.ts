
// [1, 2, 3, 4, 5, ...,49 , 50]

export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {

  // si el numero de paginas es 7 o menos vamos a mostrar todas las paginas sin puntos suspensivos
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1) // [1, 2, 3, 4, 5, 6, 7]
  }


  // si la pagina actual esta entre las primeras 3 paginas, mostraremos las primeras 3, puntos suspensivos, y las ultimas 2
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages] // [1, 2, 3, ..., 49, 50]
  }

  // si la pagina actual esta entre las ultimas 3 paginas, mostraremos las primeras 2, puntos suspensivos, y las ultimas 3
  if (currentPage >= totalPages - 2) {
    return [1, '...', totalPages - 2, totalPages - 1, totalPages] // [1, ..., 48, 49, 50]
  }


  // si la pagina actual esta en otro lugar medio, mostraremos la primera pagina, puntos suspensivos, la pagina actual y vecinos
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]

}