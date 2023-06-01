package DH.grupo14.service;

import DH.grupo14.dto.ProductoDto;
import DH.grupo14.model.Producto;
import DH.grupo14.repository.IProductoRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class ProductoService implements IProductoService{

    @Autowired
    private IProductoRepository productoRepository;
    @Autowired
    ObjectMapper mapper;

    @Override
    public Producto crearProducto(ProductoDto productoDto) {return guardarProducto(productoDto);
    }

    private Producto guardarProducto(ProductoDto productoDto){
        Producto producto = mapper.convertValue(productoDto, Producto.class);
        return productoRepository.save(producto);
    }

    @Override
    public ProductoDto buscarProducto(Long idProducto) {
        Optional<Producto> producto = productoRepository.findById(idProducto);
        ProductoDto productoDto = null;
        if (producto.isPresent());
        productoDto = mapper.convertValue(producto, ProductoDto.class);
        return productoDto;
    }

    @Override
    public ProductoDto modificarProducto(ProductoDto productoDto) {
        guardarProducto(productoDto);
        return productoDto;
    }

    @Override
    public void eliminarProducto(Long idProducto) {productoRepository.deleteById(idProducto);}

    @Override
    public Set<ProductoDto> getTodos() {
        List<Producto> productos = productoRepository.findAll();
        Set<ProductoDto> productoDto = new HashSet<>();

        for (Producto producto: productos){
            productoDto.add(mapper.convertValue(producto,ProductoDto.class));
        }
        return productoDto;
    }

    @Override
    public Set<ProductoDto> buscarFiltrando(Long idCategoria, Long idCiudad){
        return productoRepository.buscarFiltrando(idCategoria, idCiudad);
    }

    @Override
    public Set<ProductoDto> buscarRandom(){return productoRepository.buscarRandom();}





//    public ProductListDTO searchByCategory(Long id){
//        List<Product> items = productRepository.findByCategoryId(id);
//        ProductListDTO response = new ProductListDTO();
//        response.setItems(items);
//        response.setTotal(items.size());
//
//        return response;
//    }
//
//    public ProductListDTO searchByCity(Long id){
//        List<Product> items = productRepository.findByCityId(id);
//        ProductListDTO response = new ProductListDTO();
//        response.setItems(items);
//        response.setTotal(items.size());
//
//        return response;
//    }
//
//    @Override
//    public List<Product> randomProducts() {
//        List<Category> categories = categoryRepository.findAll();
//        Collections.shuffle(categories);
//        Integer indexEnd = categories.size() < LIMIT_RANDOM ? categories.size()-1 : LIMIT_RANDOM -1;
//        List<Category> categoriesSubList = categories.subList(0, indexEnd);
//        if (categories.isEmpty()){
//            return Collections.EMPTY_LIST;
//        }
//        List<Product> products = productRepository
//                .findByCategoryIds(
//                        categoriesSubList
//                                .stream()
//                                .map(Category::getId)
//                                .collect(Collectors.toList())
//                );
//        Collections.shuffle(products);
//        return products.subList(0, getRandomNumber(0, products.size() -1));//Map: toma un objeto, lo convierte y devuelve siempre la misma cantidad. Transforma la lista de categorías en una lista de enteros (misma cantidad).
//    }
//
//    public int getRandomNumber(int min, int max) {
//        Random random = new Random();
//        return random.ints(min, max)
//                .findFirst()
//                .getAsInt();
//    }



    //Filtro fechas
    @Override
    public Collection<ProductoDto> findProductByDate(Date fechaInicio, Date fechaFinal) {
        Collection<Producto> products = productoRepository.findProductByDate(fechaInicio, fechaFinal);
        Set<ProductoDto> productDTOS = new HashSet<>();
        for (Producto product : products) {
            productDTOS.add(mapper.convertValue(product, ProductoDto.class));
        }
        return productDTOS;
    }

    //Filtro por ciudad y fechas
    @Override
    public Collection<ProductoDto> findProductByDateAndCity(Date fechaInicio, Date fechaFinal, String nombre ) {
        Collection<Producto> products = productoRepository.findProductByDateAndCity(fechaInicio,fechaFinal,nombre);
        Set<ProductoDto> productDTOS =new HashSet<>();
        for (Producto product: products) {
            productDTOS.add(mapper.convertValue(product,ProductoDto.class));
        }
        return productDTOS;
    }


}
