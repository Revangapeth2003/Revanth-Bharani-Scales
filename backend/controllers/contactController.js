import * as db from '../db/index.js';
// import { sendEmailToAdmin, sendConfirmationToUser } from '../config/email.js';
import { sendEmailToAdmin, sendConfirmationToUser } from '../config/gmailConfig.js';

export const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      console.warn('⚠️  Validation failed: missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields'
      });
    }

    console.log('📝 Processing contact form submission...');
    console.log(`   Name: ${name}`);
    console.log(`   Email: ${email}`);

    // Save to database
    console.log('💾 Saving to database...');
    const contact = await db.createContact({
      name,
      email,
      phone,
      subject,
      message
    });
    
    console.log(`✅ Contact saved with ID: ${contact.id}`);

    // Send emails (non-blocking)
    console.log('📧 Sending emails...');
    
    // Send to admin
    sendEmailToAdmin({ name, email, phone, subject, message })
      .then(() => console.log('✅ Admin notification sent'))
      .catch(err => console.error('⚠️  Admin email failed:', err.message));

    // Send confirmation to user
    sendConfirmationToUser({ name, email, phone, subject, message })
      .then(() => console.log('✅ User confirmation sent'))
      .catch(err => console.error('⚠️  Confirmation email failed:', err.message));

    res.status(201).json({
      success: true,
      message: 'Your message has been received! We will get back to you soon.',
      data: {
        id: contact.id,
        name: contact.name,
        email: contact.email
      }
    });

  } catch (error) {
    console.error('❌ Error in submitContact:', error.message);
    console.error('   Stack:', error.stack);
    next(error);
  }
};

export const getContacts = async (req, res, next) => {
  try {
    console.log('📋 Fetching all contacts...');
    const contacts = await db.getAllContacts();
    console.log(`✅ Retrieved ${contacts.length} contacts`);
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('❌ Error in getContacts:', error.message);
    next(error);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`📄 Fetching contact ID: ${id}`);
    
    const contact = await db.getContactById(id);

    if (!contact) {
      console.warn(`⚠️  Contact not found: ${id}`);
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    console.log(`✅ Contact retrieved: ${contact.name}`);
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('❌ Error in getContact:', error.message);
    next(error);
  }
};

// NEW: Delete contact lead
export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`🗑️  Deleting contact ID: ${id}`);
    
    const deleted = await db.deleteContactById(id);

    if (!deleted) {
      console.warn(`⚠️  Contact not found: ${id}`);
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    console.log(`✅ Contact deleted: ${id}`);
    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('❌ Error in deleteContact:', error.message);
    next(error);
  }
};

// NEW: Mark contact as read
export const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`✓ Marking contact as read: ${id}`);
    
    const updated = await db.markContactAsRead(id);

    if (!updated) {
      console.warn(`⚠️  Contact not found: ${id}`);
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    console.log(`✅ Contact marked as read: ${id}`);
    res.status(200).json({
      success: true,
      message: 'Contact marked as read'
    });
  } catch (error) {
    console.error('❌ Error in markAsRead:', error.message);
    next(error);
  }
};
