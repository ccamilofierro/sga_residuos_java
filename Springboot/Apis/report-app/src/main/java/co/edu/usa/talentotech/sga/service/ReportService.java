package co.edu.usa.talentotech.sga.service;

import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.usa.talentotech.sga.entity.CollectionPoint;
import co.edu.usa.talentotech.sga.repository.CollectionPointRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    @Autowired
    private CollectionPointRepository collectionPointRepository;

    public byte[] generateCollectionPointsReport() throws Exception {
        List<CollectionPoint> collectionPoints = collectionPointRepository.findAll();
        String reportPath = "src/main/resources/reports/collection_points_report.jrxml";
        
        JasperReport jasperReport = JasperCompileManager.compileReport(reportPath);
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(collectionPoints);
        
        Map<String, Object> parameters = new HashMap<>();

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
        return JasperExportManager.exportReportToPdf(jasperPrint);
    }
}