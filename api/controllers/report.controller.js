const Project = require('../models/Project.model');
const User = require('../models/User.model');
const logger = require('../utils/logger');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.generateProjectSummary = async (req, res) => {
  try {
    const project = await Project.findOne({ 
      projectId: req.params.projectId.trim() 
    }).populate('createdBy', 'name email role');
        
    if (!project) {
      return res.status(404).json({
        status: 'fail',
        message: 'No project found with that ID'
      });
    }

    // Check permissions
    if (req.user.role !== 'admin' && project.createdBy._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to generate reports for this project'
      });
    }

    // Create PDF
    const doc = new PDFDocument();
    const filePath = path.join(__dirname, `../public/reports/project-summary-${project.projectId}.pdf`);
    
    doc.pipe(fs.createWriteStream(filePath));
    
    // PDF content
    doc.fontSize(20).text('Project Summary Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Project ID: ${project.projectId}`);
    doc.text(`Project Name: ${project.name}`);
    doc.text(`Status: ${project.status}`);
    doc.text(`Created By: ${project.createdBy.name} (${project.createdBy.role})`);
    doc.text(`Created At: ${project.createdAt.toDateString()}`);
    doc.moveDown();
    
    // Stage A summary
    doc.fontSize(16).text('Stage A: Project Information', { underline: true });
    doc.fontSize(12);
    doc.text(`Location: ${project.stageA.site.state}, ${project.stageA.site.lga}, ${project.stageA.site.town}`);
    doc.text(`Budget: $${project.stageA.projectInfo.budget}`);
    doc.text(`Start Date: ${project.stageA.projectInfo.startDate.toDateString()}`);
    doc.text(`End Date: ${project.stageA.projectInfo.endDate.toDateString()}`);
    doc.moveDown();
    
    // Stage B summary (if completed)
    if (project.stageB.completed) {
      doc.fontSize(16).text('Stage B: Drilling Information', { underline: true });
      doc.fontSize(12);
      doc.text(`Drilling Method: ${project.stageB.drillingInfo.method}`);
      doc.text(`Depth: ${project.stageB.drillingInfo.depth}m`);
      doc.text(`Yield: ${project.stageB.drillingInfo.yield}L/s`);
      doc.text(`Approving Geologist: ${project.stageB.approvingGeologist.name}`);
      doc.moveDown();
    }
    
    // Stage C summary (if completed)
    if (project.stageC.completed) {
      doc.fontSize(16).text('Stage C: Water Quality', { underline: true });
      doc.fontSize(12);
      doc.text('Water Quality Parameters:');
      
      // Add table of parameters
      const tableTop = doc.y;
      const col1 = 50;
      const col2 = 200;
      const col3 = 300;
      const col4 = 400;
      
      // Table headers
      doc.font('Helvetica-Bold')
        .text('Parameter', col1, tableTop)
        .text('Value', col2, tableTop)
        .text('Unit', col3, tableTop)
        .text('Standard', col4, tableTop);
      
      // Table rows
      let y = tableTop + 25;
      doc.font('Helvetica');
      project.stageC.waterQuality.forEach(param => {
        doc.text(param.parameter, col1, y)
          .text(param.value.toString(), col2, y)
          .text(param.unit, col3, y)
          .text(param.standard.toString(), col4, y);
        y += 20;
      });
      
      doc.moveDown();
      doc.text(`Recommendation: ${project.stageC.recommendation}`);
    }
    
    doc.end();
    
    // Send file after PDF generation is complete
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=project-summary-${project.projectId}.pdf`);
    
    fs.createReadStream(filePath).pipe(res).on('finish', () => {
      // Delete the file after sending
      fs.unlinkSync(filePath);
    });
  } catch (err) {
    logger.error(`Error generating project summary: ${err.message}`);
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.generateGeologicalReport = async (req, res) => {
  try {
    const project = await Project.findOne({ projectId: req.params.projectId });
    
    if (!project) {
      return res.status(404).json({
        status: 'fail',
        message: 'No project found with that ID'
      });
    }

    // Check permissions
    if (req.user.role !== 'admin' && project.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to generate reports for this project'
      });
    }

    // Create PDF
    const doc = new PDFDocument();
    const filePath = path.join(__dirname, `../public/reports/geological-${project.projectId}.pdf`);
    
    doc.pipe(fs.createWriteStream(filePath));
    
    // PDF content
    doc.fontSize(20).text('Geological Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Project ID: ${project.projectId}`);
    doc.text(`Project Name: ${project.name}`);
    doc.moveDown();
    
    // Geology details
    doc.fontSize(16).text('Geological Information', { underline: true });
    doc.fontSize(12);
    doc.text(`Rock Type: ${project.stageA.geology.rockType}`);
    doc.text(`Aquifer Type: ${project.stageA.geology.aquiferType}`);
    doc.text(`Previous Studies: ${project.stageA.geology.previousStudies}`);
    doc.moveDown();
    
    // Drilling details (if available)
    if (project.stageB.completed) {
      doc.fontSize(16).text('Drilling Observations', { underline: true });
      doc.fontSize(12);
      doc.text(`Depth: ${project.stageB.drillingInfo.depth}m`);
      doc.text(`Static Water Level: ${project.stageB.drillingInfo.staticWaterLevel}m`);
      doc.text(`Yield: ${project.stageB.drillingInfo.yield}L/s`);
      doc.moveDown();
    }
    
    doc.end();
    
        // Send file after PDF generation is complete
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=geological-${project.projectId}.pdf`);
        
        fs.createReadStream(filePath).pipe(res).on('finish', () => {
          // Delete the file after sending
          fs.unlinkSync(filePath);
        });
      } catch (err) {
        logger.error(`Error generating geological report: ${err.message}`);
        res.status(400).json({
          status: 'fail',
          message: err.message
        });
      }
    };
    
    exports.generateDrillingReport = async (req, res) => {
      try {
        const project = await Project.findOne({ projectId: req.params.projectId });
        
        if (!project) {
          return res.status(404).json({
            status: 'fail',
            message: 'No project found with that ID'
          });
        }
    
        // Check permissions
        if (req.user.role !== 'admin' && project.createdBy.toString() !== req.user._id.toString()) {
          return res.status(403).json({
            status: 'fail',
            message: 'You do not have permission to generate reports for this project'
          });
        }
    
        // Verify stage B is completed
        if (!project.stageB.completed) {
          return res.status(400).json({
            status: 'fail',
            message: 'Stage B must be completed to generate drilling report'
          });
        }
    
        // Create PDF
        const doc = new PDFDocument();
        const filePath = path.join(__dirname, `../public/reports/drilling-${project.projectId}.pdf`);
        
        doc.pipe(fs.createWriteStream(filePath));
        
        // PDF content
        doc.fontSize(20).text('Drilling Report', { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).text(`Project ID: ${project.projectId}`);
        doc.text(`Project Name: ${project.name}`);
        doc.moveDown();
        
        // Drilling details
        doc.fontSize(16).text('Drilling Information', { underline: true });
        doc.fontSize(12);
        doc.text(`Method: ${project.stageB.drillingInfo.method}`);
        doc.text(`Depth: ${project.stageB.drillingInfo.depth}m`);
        doc.text(`Diameter: ${project.stageB.drillingInfo.diameter}mm`);
        doc.text(`Casing Type: ${project.stageB.drillingInfo.casingType}`);
        doc.text(`Screen Type: ${project.stageB.drillingInfo.screenType}`);
        doc.text(`Gravel Pack: ${project.stageB.drillingInfo.gravelPack}`);
        doc.text(`Development Method: ${project.stageB.drillingInfo.developmentMethod}`);
        doc.text(`Yield: ${project.stageB.drillingInfo.yield}L/s`);
        doc.text(`Static Water Level: ${project.stageB.drillingInfo.staticWaterLevel}m`);
        doc.moveDown();
        
        // Approvals
        doc.fontSize(16).text('Approvals', { underline: true });
        doc.fontSize(12);
        doc.text(`Environmental Approval: ${project.stageB.approvals.environmentalApproval ? 'Yes' : 'No'}`);
        doc.text(`Community Approval: ${project.stageB.approvals.communityApproval ? 'Yes' : 'No'}`);
        doc.text(`Regulatory Approval: ${project.stageB.approvals.regulatoryApproval ? 'Yes' : 'No'}`);
        doc.moveDown();
        
        // Approving Geologist
        if (project.stageB.approvingGeologist) {
          doc.fontSize(16).text('Approving Geologist', { underline: true });
          doc.fontSize(12);
          doc.text(`Name: ${project.stageB.approvingGeologist.name}`);
          doc.text(`License Number: ${project.stageB.approvingGeologist.licenseNumber}`);
          doc.text(`Date: ${new Date(project.stageB.approvingGeologist.date).toDateString()}`);
        }
        
        doc.end();
        
        // Send file
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=drilling-${project.projectId}.pdf`);
        
        fs.createReadStream(filePath).pipe(res).on('finish', () => {
          fs.unlinkSync(filePath);
        });
      } catch (err) {
        logger.error(`Error generating drilling report: ${err.message}`);
        res.status(400).json({
          status: 'fail',
          message: err.message
        });
      }
    };
    
    exports.generateMonthlyWorkLog = async (req, res) => {
      try {
        const { year, month } = req.params;
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);
    
        // Get projects for the month
        const projects = await Project.find({
          createdAt: { $gte: startDate, $lte: endDate },
          createdBy: req.user._id
        }).sort('createdAt');
    
        if (projects.length === 0) {
          return res.status(404).json({
            status: 'fail',
            message: 'No projects found for this period'
          });
        }
    
        // Create PDF
        const doc = new PDFDocument();
        const filePath = path.join(__dirname, `../public/reports/monthly-log-${year}-${month}.pdf`);
        
        doc.pipe(fs.createWriteStream(filePath));
        
        // PDF content
        doc.fontSize(20).text('Monthly Work Log', { align: 'center' });
        doc.fontSize(16).text(`${new Date(year, month - 1).toLocaleString('default', { month: 'long' })} ${year}`, { align: 'center' });
        doc.moveDown();
        
        // Projects summary
        doc.fontSize(14).text(`Total Projects: ${projects.length}`);
        doc.moveDown();
        
        // Projects table
        const tableTop = doc.y;
        const col1 = 50;
        const col2 = 200;
        const col3 = 350;
        const col4 = 450;
        
        // Table headers
        doc.font('Helvetica-Bold')
          .text('Project ID', col1, tableTop)
          .text('Name', col2, tableTop)
          .text('Status', col3, tableTop)
          .text('Created', col4, tableTop);
        
        // Table rows
        let y = tableTop + 25;
        doc.font('Helvetica');
        projects.forEach(project => {
          doc.text(project.projectId, col1, y)
            .text(project.name, col2, y)
            .text(project.status, col3, y)
            .text(project.createdAt.toDateString(), col4, y);
          y += 20;
        });
        
        doc.end();
        
        // Send file
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=monthly-log-${year}-${month}.pdf`);
        
        fs.createReadStream(filePath).pipe(res).on('finish', () => {
          fs.unlinkSync(filePath);
        });
      } catch (err) {
        logger.error(`Error generating monthly work log: ${err.message}`);
        res.status(400).json({
          status: 'fail',
          message: err.message
        });
      }
    };