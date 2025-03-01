"use client"; // Indicates that this component is a client-side rendered React component

import { useState, useRef } from 'react'; // Import React's useState and useRef hooks for state management and DOM references
import { mockUser } from "../utils/mockData"; // Import mock data for prototyping UI components
import dynamic from "next/dynamic"; // Import Next.js dynamic for code splitting and lazy loading

// Import reusable UI components from components directory
import SubscriptionCard from './SubscriptionCard'; // Subscription management card component
import UpcomingBills from "./UpcomingBills"; // Bill tracking component
import MedicationCard from "./MedicationCard"; // Medication reminder component
import DebtPayoffTool from "./DebtPayoffTool"; // Debt management tool component
import SavingsGoalCard from "./SavingsGoalCard"; // Savings progress component
import RecentTransactionsCard from './RecentTransactionsCard'; // Recent transactions component
import Wallet from "./Wallet"; // Primary wallet display component

// Lazy-load chart component for better performance
const SpendingChart = dynamic(() => import("./SpendingChart"), {
    ssr: false, // Disable server-side rendering for client-specific features
});

// Interface defining component props with optional user data
// NOTE: You can extend this interface to include additional user properties
interface DashboardProps {
  user?: { name: string; email?: string };
}

// Main dashboard component managing card interactions
// NOTE: Receives user prop for personalization (defaults to mock data)
export default function Dashboard({ user = mockUser }: DashboardProps) {
    // State for tracking active card selection
    // NOTE: Uses null to represent no active card state
    const [activeCard, setActiveCard] = useState<string | null>(null);

    // Refs for accessing DOM elements of individual cards
    // NOTE: Used for smooth scrolling functionality
    const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

    // Smooth scroll implementation for card navigation
    // NOTE: You can modify the scroll behavior by adjusting these options
    const scrollToCard = (cardTitle: string) => {
      if (cardRefs.current[cardTitle]) {
        cardRefs.current[cardTitle]?.scrollIntoView({
          behavior: 'smooth', // Animated scrolling effect
          block: 'start', // Vertical alignment position in viewport
        });
      }
    };

    // Handles card click interactions and manages active state
    /*
    CARD INTERACTION FLOW:
    1. User clicks card button.
    2. State updates activeCard.
    3. DOM updates component visibility.
    4. Smooth scroll triggers.
    5. Content animates in.
    */
    const handleCardClick = (cardTitle: string) => {
      const isSameCard = activeCard === cardTitle;
      setActiveCard(isSameCard ? null : cardTitle);

      if (!isSameCard) {
        setTimeout(() => scrollToCard(cardTitle), 100); // Small delay for render
      }
    };

    // Array defining dashboard card configurations
    const cards = [
      { title: "Upcoming Bills", emoji: "📅", component: <UpcomingBills /> },
      { title: "Subscriptions", emoji: "🔄", component: <SubscriptionCard /> },
      { title: "Medications", emoji: "💊", component: <MedicationCard /> },
      { title: "Debt Payoff", emoji: "💸", component: <DebtPayoffTool /> },
      { title: "Savings Goal", emoji: "🎯", component: <SavingsGoalCard /> },
      { title: "Spending Trends", emoji: "📊", component: <SpendingChart /> },
      { title: "Recent Transactions", emoji: "💳", component: <RecentTransactionsCard />, },
       /* TEMPLATE FOR NEW CARDS:
      { 
        title: "New Feature", 
        emoji: "✨", 
        component: <NewComponent /> 
      },
      */
    ];

      // Main container with gradient background and responsive spacing
    // NOTE: Modify the gradient colors by changing from-gray-900/to-blue-900
  return (
    <div className="p-6 mx-auto bg-gradient-to-br from-gray-900 to-blue-900 text-white p-6 w-screen space-y-8">
     
      {/* Application title header */}
     <h1 className="text-left sm:text-left text-4xl font-bold text-gray-200 mb-8">
        NextBanking {/* Brand name - update to match your application name */}
      </h1>

      {/* Personalized user greeting */}
      {/* NOTE: The user.name value comes from props - ensure proper sanitization */}
      <h2 className="text-sm text-gray-300 mt-4 mb-2">{user.name}&apos;s dashboard</h2>
    

      {/* First Row: Primary wallet display section */}
      {/* NOTE: This flex container centers the wallet component */}
      <div className="flex justify-center items-start"> 
        {/* Responsive width container */}
        {/* NOTE: Adjust max-width using lg:max-w-* classes for different breakpoints */}
      <div className="w-full lg:max-w-2xl"> 
        <Wallet />  {/* Reusable wallet component - modify in components/Wallet */}
      </div>
      </div>

      {/* Second Row: All interactive cards */}
      {/* NOTE: Modify gap-6 to adjust spacing between cards */}
      <div className="space-y-6">
          {/* Responsive card button grid */}
          {/* NOTE: flex-wrap allows cards to wrap on smaller screens */}
        <div className="flex flex-wrap gap-6 justify-center">
          {/*Dynamically iterate over the `cards` array to generate a button for each card
          Each card object contains properties like `title`, `emoji`, and `component`
          The `map` function returns a new JSX element for each card, rendering them in the UI */}
          {cards.map((card) => (
            <button
              key={card.title}
              onClick={() => handleCardClick(card.title)}
              className={`w-40 h-40 rounded-full bg-black text-white hover:bg-gray-800 transition-colors text-lg font-medium flex flex-col items-center justify-center p-4 ${
                activeCard === card.title ? 'ring-4 ring-blue-500' : ''
              }`}
            >
              {/* Card Emoji visual indicator */}
              <span className="text-3xl mb-2">{card.emoji}</span>

              {/* Card title text */}
              {/* NOTE: text-sm controls the font size of the title */}
              <span className="text-sm text-center leading-tight">{card.title}</span>
            </button>
          ))}
        </div>

      {/* Dynamic content display area */}
        {/* NOTE: max-w-2xl controls the maximum width of expanded cards */}
        <div className="flex justify-center items-center w-full">
          <div className="w-full max-w-2xl">
          {cards.map((card) => (
  <div
    key={card.title}
    ref={(el) => {
      cardRefs.current[card.title] = el; // No return value needed
    }}
    className={`transition-opacity duration-300 ${
      activeCard === card.title ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
    }`}
  >
    {activeCard === card.title && card.component}
  </div>
))}
          </div>
        </div>
      </div>
      {/* NOTE:
  - `cards.map` dynamically iterates over the `cards` array to generate a <div> for each card.
  - The `key` prop uniquely identifies each card for React's reconciliation process.
  - The `ref` assigns a reference to each card's DOM element, enabling smooth scrolling behavior.
  - The `className` dynamically applies styles to control visibility:
    - `opacity-100`: Makes the card fully visible when active.
    - `opacity-0 h-0 overflow-hidden`: Hides the card when inactive.
  - The `duration-300` class controls the animation speed for visibility transitions.
  - The `activeCard` state determines which card's component is rendered and visible.
*/}
 {/* COMPONENT MODIFICATION NOTES:
      1. To change card sizes: Adjust w-40 and h-40 values proportionally
      2. To modify animations: Update transition-opacity and duration-300 classes
      3. To alter active state: Change ring-4 and ring-blue-500 classes
      4. To adjust spacing: Modify gap-6 and space-y-6 values
      5. To change max width: Update max-w-2xl to different breakpoint classes */}

      {/* ACCESSIBILITY CONSIDERATIONS:
      - Ensure hover states have sufficient contrast
      - Consider adding ARIA labels for screen readers
      - Maintain focus states for keyboard navigation */}

      {/* Dashboard footer section */}
      {/* NOTE: Modify text-gray-400 to change footer text color */}
      <footer className="mt-auto text-center text-sm text-gray-400 pt-12">
        {/* Copyright notice with dynamic year */}
        {/* NOTE: Update "SecureBank" to match your organization's name */}
        <p>© {new Date().getFullYear()} SecureBank. All rights reserved.</p>

        {/* Legal links container */}
        {/* NOTE: Adjust gap-4 to modify spacing between links */}
        <div className="flex justify-center gap-4 mt-4">
          {/* Terms of Service link */}
          {/* NOTE: Update /terms route if needed */}
          <a href="/terms" className="hover:text-blue-400 transition-colors">
            Terms of Use {/* Link display text */}
          </a>

          {/* Privacy Policy link */}
          {/* NOTE: Ensure privacy policy document exists at /privacy */}
          <a href="/privacy" className="hover:text-blue-400 transition-colors">
            Privacy Policy {/* Link display text */}
          </a>

          {/* Contact information link */}
          {/* NOTE: Update /contact to your preferred contact route */}
          <a href="/contact" className="hover:text-blue-400 transition-colors">
            Contact Us {/* Link display text */}
          </a>
        </div>
      </footer>
    </div>
  );
}

export {};

// UI ARCHITECTURE NOTES:
// 1. Responsive Design:
//    - flex-wrap: Allows cards to wrap on smaller screens
//    - lg:max-w-2xl: Constrains content width on large screens
//    - sm:text-left: Adjusts text alignment across breakpoints

// 2. Visual Hierarchy:
//    - Gradient background: Creates depth and brand identity
//    - Text sizing: Establishes clear information hierarchy
//    - Emoji icons: Provides quick visual recognition

// 3. Interaction Design:
//    - hover:bg-gray-800: Indicates interactive elements
//    - transition-colors: Smooth color changes
//    - ring-blue-500: Highlights active state

// 4. Performance:
//    - Dynamic imports: Reduces initial bundle size
//    - SSR false: Optimizes client-only components
//    - Mock data: Enables development without backend

// 5. Accessibility:
//    - Semantic HTML: buttons for interactive elements
//    - Color contrast: Text/background ratios
//    - Focus states: Built-in browser defaults

// MODIFICATION GUIDE:
// 1. To change colors: Modify gradient stops (from-gray-900/to-blue-900)
// 2. To add cards: Update cards array with new entries
// 3. To adjust spacing: Modify space-y-* and gap-* classes
// 4. To change animations: Adjust transition-* and duration-* values
// 5. To update layout: Modify grid/flex structures and responsive breakpoints