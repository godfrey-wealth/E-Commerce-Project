package com.example.ecommerceshoppingcart.business.Impl;


import com.example.ecommerceshoppingcart.config.exception.ProductAlreadyExistsException;
import com.example.ecommerceshoppingcart.config.exception.ProductNotFoundException;
import com.example.ecommerceshoppingcart.dto.ProductDto;
import com.example.ecommerceshoppingcart.persistence.ProductRepository;
import com.example.ecommerceshoppingcart.persistence.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public ProductDto getProductById(Long id) {
        return productRepository.findById(id)
                .map(this::convertToDto)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));
    }

    public List<ProductDto> getProductsByCategory(String category) {
        return productRepository.findByCategory(category).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // search Product by name

//    public List<ProductDto> searchProductsByCategory(String name) {
//        return productRepository.findByCategory(category).stream()
//                .map(this::convertToDto)
//                .collect(Collectors.toList());
//    }

    public List<ProductDto> searchProductsByName(String name) {
        return productRepository.findByNameContaining(name).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public ProductDto createProduct(ProductDto productDto) {
        Product product = convertToEntity(productDto);

        // conditions for creating a new product and exception handling
        if (productRepository.existsByName(product.getName())) {
            throw new ProductAlreadyExistsException();
        }
        if (productRepository.existsByQuantity(product.getQuantity())) {
            throw new ProductAlreadyExistsException();
        }
        Product savedProduct = productRepository.save(product);
        return convertToDto(savedProduct);
    }

    public ProductDto updateProduct(Long id, ProductDto productDto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));
        updateProductFields(product, productDto);
        Product updatedProduct = productRepository.save(product);
        return convertToDto(updatedProduct);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    // Helper methods for conversion between entity and DTO
    private ProductDto convertToDto(Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .quantity(product.getQuantity())
                .category(product.getCategory())
                .orderDate(product.getOrderDate())
                .image(product.getImage())
                .build();
    }

    private Product convertToEntity(ProductDto productDto) {
        return Product.builder()
                .name(productDto.getName())
                .price(productDto.getPrice())
                .quantity(productDto.getQuantity())
                .category(productDto.getCategory())
                .orderDate(productDto.getOrderDate())
                .image(productDto.getImage())
                .build();
    }

    private void updateProductFields(Product product, ProductDto productDto) {
        product.setName(productDto.getName());
        product.setPrice(productDto.getPrice());
        product.setQuantity(productDto.getQuantity());
        product.setCategory(productDto.getCategory());
        product.setOrderDate(productDto.getOrderDate());
        product.setImage(productDto.getImage());
    }
}
