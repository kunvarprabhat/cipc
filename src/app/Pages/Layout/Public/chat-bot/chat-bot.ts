import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-bot.html',
  styleUrls: ['./chat-bot.css']
})
export class ChatBot implements OnInit, OnDestroy {
  isOpen = false;
  messages: ChatMessage[] = [];
  userMessage = '';
  isLoading = false;
  showQuickActions = true;
  isHomePage = false;
  private messageIdCounter = 0;
  private routerSubscription?: Subscription;

  constructor(private router: Router) {}

  // Quick action buttons
  quickActions = [
    { text: 'Admission Info', keyword: 'admission' },
    { text: 'Course Details', keyword: 'course' },
    { text: 'Fee Structure', keyword: 'fee' },
    { text: 'Contact Us', keyword: 'contact' },
    { text: 'Check Results', keyword: 'result' },
    { text: 'Examination', keyword: 'examination' }
  ];

  // Dummy responses for testing (will be replaced with .NET Web API)
  private dummyResponses: { [key: string]: string[] } = {
    'hello': [
      'Hello! 👋 Welcome to CIPC Paramedical Council. How can I assist you today?',
      'Hi there! I\'m here to help you with any questions about CIPC. What would you like to know?',
      'Hello! Welcome to CIPC. I can help you with admissions, courses, results, and more. How may I assist you?'
    ],
    'hi': [
      'Hello! 👋 Welcome to CIPC Paramedical Council. How can I assist you today?',
      'Hi! How can I help you today?',
      'Hi there! I\'m your CIPC assistant. What would you like to know?'
    ],
    'admission': [
      'For admission information, please visit our Admission Form page or contact us at:\n📞 +91 7275 380105\n📧 cipcvns@gmail.com\n\nYou can fill out the admission form online on our website.',
      'Admissions are open! You can fill out the admission form online. The admission process includes:\n1. Fill the online admission form\n2. Submit required documents\n3. Pay the admission fee\n\nWould you like to know more about the admission process?',
      'To apply for admission:\n• Visit the Admission Form page\n• Fill in all required details\n• Upload necessary documents\n• Submit the form\n\nFor queries, call: +91 7275 380105'
    ],
    'course': [
      'We offer various paramedical courses:\n\n• Medical Laboratory Technology (2 Years)\n• X-Ray Technology (1 Year)\n• Operation Theatre Technology (2 Years)\n• Physiotherapy\n• And more...\n\nVisit our Courses page for detailed information.',
      'We have multiple paramedical courses available:\n\n🔬 Medical Laboratory Technology\n📷 X-Ray Technology\n⚕️ Operation Theatre Technology\n🏥 Physiotherapy\n\nWhich course are you interested in?',
      'Our courses include:\n• Diploma in Medical Laboratory Technology\n• Diploma in X-Ray Technology\n• Diploma in Operation Theatre Technology\n• And other paramedical courses\n\nAll courses are recognized and provide excellent placement opportunities.'
    ],
    'fee': [
      'For fee structure and payment details, please contact our admission office:\n📞 Phone: +91 7275 380105\n📧 Email: cipcvns@gmail.com\n\nFee structure varies by course and includes tuition fees, lab fees, and other charges.',
      'Fee structure varies by course. Please contact our office for detailed fee information:\n\n📞 +91 7275 380105\n📧 cipcvns@gmail.com\n\nWe also offer flexible payment options.',
      'For complete fee details:\n• Contact: +91 7275 380105\n• Email: cipcvns@gmail.com\n• Visit: Our office at N-9/38F-31 NEWADA, SUNDERPUR, VARANASI - 221 005\n\nFee structure is available for each course separately.'
    ],
    'contact': [
      'You can contact us at:\n\n📞 Phone: +91 7275 380105\n📧 Email: cipcvns@gmail.com\n📍 Address: N-9/38F-31 NEWADA, SUNDERPUR, VARANASI - 221 005\n\nOffice Hours: Monday to Saturday, 9:00 AM - 5:00 PM',
      'Contact Information:\n\n📞 Phone: +91 7275 380105\n📧 Email: cipcvns@gmail.com\n📍 Registered Office: N-9/38F-31 NEWADA, SUNDERPUR, VARANASI - 221 005\n\nWe\'re here to help!',
      'Get in touch with us:\n\n☎️ +91 7275 380105\n✉️ cipcvns@gmail.com\n🏢 N-9/38F-31 NEWADA, SUNDERPUR, VARANASI - 221 005\n\nFeel free to call or email us anytime!'
    ],
    'result': [
      'You can check your results by visiting the Results page on our website. Enter your:\n• Enrolment Number\n• Date of Birth\n\nThen click "Check Results" to view your grade card. You can also download the PDF.',
      'Results are available online! Here\'s how to check:\n\n1. Go to the Results page\n2. Enter your Enrolment Number\n3. Enter your Date of Birth\n4. Click "Check Results"\n\nYou can view and download your grade card.',
      'To check your results:\n• Visit: Results page\n• Enter: Enrolment Number & DOB\n• View: Your grade card\n• Download: PDF format available\n\nFor result-related queries, contact the examination department.'
    ],
    'examination': [
      'For examination related queries:\n\n• Visit the Examination page\n• Fill the Examination Form\n• Check Time Table\n• View Results\n\nContact examination department for schedule details.',
      'Examination information:\n\n📋 Fill Examination Form online\n📅 Check Time Table\n📊 View Results\n📞 Contact: +91 7275 380105\n\nAll examination forms and schedules are available on our website.',
      'Examination details:\n\n1. Fill Examination Form (online)\n2. Check Time Table for exam dates\n3. View Results after exams\n4. Download Grade Cards\n\nVisit the Examination page for more information.'
    ],
    'syllabus': [
      'Syllabus information is available on our website:\n\n• Visit the Syllabus page\n• Download course-wise syllabus\n• View curriculum details\n\nFor specific syllabus queries, contact: +91 7275 380105',
      'You can access syllabus:\n\n📚 Visit Syllabus page\n📥 Download PDF files\n📖 View course curriculum\n\nAll course syllabi are available online.'
    ],
    'placement': [
      'We provide excellent placement assistance:\n\n✅ 100% Placement Support\n✅ Industry Connections\n✅ Career Guidance\n✅ Interview Preparation\n\nContact placement cell: +91 7275 380105',
      'Placement services:\n\n• Job placement assistance\n• Industry partnerships\n• Career counseling\n• Interview training\n\nOur students get placed in top hospitals and healthcare facilities.'
    ],
    'scholarship': [
      'Scholarship information:\n\n• Merit-based scholarships available\n• Financial assistance programs\n• Contact: +91 7275 380105\n• Email: cipcvns@gmail.com\n\nVisit Scholarships page for details.',
      'We offer various scholarship programs:\n\n🎓 Merit Scholarships\n💰 Financial Aid\n📋 Eligibility criteria available\n\nContact our office for scholarship applications.'
    ],
    'time table': [
      'Time Table is available online:\n\n📅 Visit Time Table page\n📥 Download PDF\n📋 View exam schedules\n\nUpdated time tables are posted regularly.',
      'Access Time Table:\n\n• Go to Time Table page\n• View exam schedules\n• Download PDF format\n• Check for updates\n\nTime tables are updated before each examination.'
    ],
    'form': [
      'We have various forms available:\n\n📝 Admission Form\n📋 Examination Form\n📄 Certification Form\n\nAll forms can be filled online on our website.',
      'Available forms:\n\n1. Admission Form - For new admissions\n2. Examination Form - For exams\n3. Certification Form - For certificates\n\nVisit Forms section to fill online.'
    ],
    'thank': [
      'You\'re welcome! 😊 If you have any more questions, feel free to ask. Have a great day!',
      'Happy to help! 👍 If you need anything else, just ask. Good luck!',
      'Glad I could help! 🌟 Feel free to reach out anytime. Best wishes!'
    ],
    'bye': [
      'Goodbye! 👋 Have a great day! Feel free to come back if you need any help.',
      'See you later! 😊 Take care and all the best!',
      'Bye! 👋 Wishing you all the best. Come back anytime!'
    ],
    'default': [
      'I understand you\'re looking for information. Could you please provide more details? You can also:\n\n📞 Call: +91 7275 380105\n📧 Email: cipcvns@gmail.com\n\nI can help with:\n• Admissions\n• Courses\n• Results\n• Examinations\n• Contact Information',
      'I\'m here to help! Could you be more specific? I can assist with:\n\n✅ Admission queries\n✅ Course information\n✅ Results\n✅ Examinations\n✅ Contact details\n\nFor immediate assistance: +91 7275 380105',
      'I can help you with:\n\n• Admission Information\n• Course Details\n• Results & Examinations\n• Contact Information\n• Fee Structure\n\nPlease ask your question or contact us at +91 7275 380105'
    ]
  };

  ngOnInit() {
    // Add welcome message when component initializes
    this.addBotMessage('Hello! 👋 Welcome to CIPC Paramedical Council. I\'m here to help you with any questions. How can I assist you today?');
    
    // Check if we're on home page
    this.checkHomePage();
    
    // Listen to route changes
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkHomePage();
      });
  }

  private checkHomePage() {
    const url = this.router.url;
    this.isHomePage = url === '/' || url === '/home' || url === '';
  }

  ngOnDestroy() {
    // Cleanup subscriptions
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.messages.length === 1) {
      // Scroll to bottom when opening
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }
  
  // Public method to check if chat is open (for external access)
  get chatIsOpen(): boolean {
    return this.isOpen;
  }

  sendMessage(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Only send if message is not empty and not loading
    if (!this.userMessage || !this.userMessage.trim() || this.isLoading) {
      return;
    }

    const userMsg = this.userMessage.trim();
    
    // Clear input immediately after getting the message
    this.userMessage = '';
    
    // Add user message to chat
    this.addUserMessage(userMsg);
    this.isLoading = true;
    this.showQuickActions = false;

    // Simulate API delay (will be replaced with actual .NET Web API call)
    setTimeout(() => {
      const response = this.getDummyResponse(userMsg);
      this.addBotMessage(response);
      this.isLoading = false;
      this.scrollToBottom();
    }, 800);
  }

  sendQuickAction(keyword: string) {
    this.userMessage = keyword;
    this.sendMessage();
  }

  private addUserMessage(text: string) {
    this.messages.push({
      id: ++this.messageIdCounter,
      text,
      sender: 'user',
      timestamp: new Date()
    });
    this.scrollToBottom();
  }

  private addBotMessage(text: string) {
    this.messages.push({
      id: ++this.messageIdCounter,
      text,
      sender: 'bot',
      timestamp: new Date()
    });
    this.scrollToBottom();
  }

  private getDummyResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase().trim();
    
    // Direct keyword matching with priority
    const keywordMap: { [key: string]: string } = {
      // Greetings (highest priority)
      'hello': 'hello',
      'hi': 'hi',
      'hey': 'hi',
      'namaste': 'hi',
      'good morning': 'hello',
      'good afternoon': 'hello',
      'good evening': 'hello',
      
      // Thanks and goodbye
      'thank': 'thank',
      'thanks': 'thank',
      'thank you': 'thank',
      'bye': 'bye',
      'goodbye': 'bye',
      'see you': 'bye',
      
      // Admission
      'admission': 'admission',
      'admit': 'admission',
      'apply': 'admission',
      'admission form': 'admission',
      'how to apply': 'admission',
      
      // Courses
      'course': 'course',
      'courses': 'course',
      'program': 'course',
      'programme': 'course',
      'programs': 'course',
      'what courses': 'course',
      'which course': 'course',
      
      // Fees
      'fee': 'fee',
      'fees': 'fee',
      'payment': 'fee',
      'cost': 'fee',
      'price': 'fee',
      'tuition': 'fee',
      'fee structure': 'fee',
      
      // Contact
      'contact': 'contact',
      'phone': 'contact',
      'email': 'contact',
      'address': 'contact',
      'call': 'contact',
      'phone number': 'contact',
      'mobile': 'contact',
      
      // Results
      'result': 'result',
      'results': 'result',
      'grade': 'result',
      'marks': 'result',
      'grade card': 'result',
      'check result': 'result',
      
      // Examination
      'examination': 'examination',
      'exam': 'examination',
      'test': 'examination',
      'exams': 'examination',
      'examination form': 'examination',
      
      // Syllabus
      'syllabus': 'syllabus',
      'curriculum': 'syllabus',
      'syllabi': 'syllabus',
      
      // Placement
      'placement': 'placement',
      'job': 'placement',
      'career': 'placement',
      'jobs': 'placement',
      'placement assistance': 'placement',
      
      // Scholarship
      'scholarship': 'scholarship',
      'scholarships': 'scholarship',
      'financial': 'scholarship',
      'financial aid': 'scholarship',
      
      // Time Table
      'time table': 'time table',
      'timetable': 'time table',
      'schedule': 'time table',
      'exam schedule': 'time table',
      
      // Forms
      'form': 'form',
      'forms': 'form',
      'application form': 'form'
    };
    
    // Check for keyword matches
    for (const [searchTerm, responseKey] of Object.entries(keywordMap)) {
      if (lowerMessage.includes(searchTerm)) {
        const responses = this.dummyResponses[responseKey];
        if (responses && responses.length > 0) {
          return responses[Math.floor(Math.random() * responses.length)];
        }
      }
    }
    
    // Default response if no match found
    return this.dummyResponses['default'][Math.floor(Math.random() * this.dummyResponses['default'].length)];
  }

  private scrollToBottom() {
    setTimeout(() => {
      const chatMessages = document.querySelector('.chat-messages');
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }, 100);
  }

  // Method to be used when .NET Web API is integrated
  private async sendToAPI(message: string): Promise<string> {
    // TODO: Replace with actual .NET Web API call
    // Example:
    // const response = await this.http.post<{message: string}>('api/chat', { message }).toPromise();
    // return response.message;
    
    // For now, return dummy response
    return this.getDummyResponse(message);
  }

  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  }
}

