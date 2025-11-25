
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Layout, Type, Image as ImageIcon, Download, Save, 
  ChevronLeft, ChevronRight, Plus, Trash2, RefreshCw, 
  Home, Settings, ZoomIn, ZoomOut, 
  Linkedin, Instagram, Wand2, Undo, Redo,
  Bold, Italic, AlignLeft, AlignCenter, AlignRight, Upload,
  Palette, Check, Layers, BoxSelect, UserCircle2, ArrowRightCircle,
  MoveUp, MoveDown, Sparkles, Grid3X3, Loader2, Link, Globe,
  PaintBucket, Smartphone, FolderOpen, Copy, GripVertical, FileText,
  AlertCircle, ToggleLeft, ToggleRight, Underline, List, ListOrdered,
  Strikethrough, X, ChevronDown, Monitor, Droplet, Grid2X2, Circle, ArrowRight, Divide, Building2, User,
  MoveRight, ChevronsRight, ArrowBigRight, ArrowRightSquare, CornerDownRight, TrendingUp, ExternalLink, MousePointer2,
  ArrowUpNarrowWide, Shuffle, MoreHorizontal, FilePlus, LogOut, CreditCard, Hexagon, Triangle, Zap, ScanLine, Waves, Activity, GripHorizontal,
  Lightbulb, CheckSquare, SplitSquareHorizontal, AlignJustify, Brain, Pipette, Paintbrush,
  Grip, Slash, Cloud, Maximize, Aperture, Star, Heart, DollarSign, Code, Music, Sliders, Wind, ScanFace, FileUp, Gem, Boxes, Minus,
  Hand, Lock, Unlock, MousePointer, Maximize2, Focus, EyeOff, PlusCircle, Square,
  PieChart, BookOpen, Users, Target, MessageCircle, BarChart3, PenTool,
  AlignVerticalJustifyStart, AlignVerticalJustifyCenter, AlignVerticalJustifyEnd,
  Percent, Scale, ListChecks, GitBranch, Quote, BookOpenCheck,
  Briefcase, Leaf, Coffee, Crown, Sun, LineChart, Cpu, Coins, Bell, Search, Menu
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import type { Page } from '../../App';

// --- CONSTANTS ---

const API_KEY = "AIzaSyBct-aH3SaQY7y48CHjT_sERW3YCZfLuc4";

// --- TYPES ---

type SlideLayout = 'hook' | 'two-col' | 'list' | 'stat' | 'quote' | 'cta' | 'center' | 'image-left';
type PatternType = 
  'none' | 'grid' | 'dots' | 'paper' | 'noise' | 'glass' | 
  'lines-h' | 'lines-v' | 'diagonal-thin' | 'diagonal-thick' | 
  'checkboard' | 'polka' | 'plus' | 'crosshatch' | 'waves' | 
  'zigzag' | 'hex' | 'vignette' | 'mesh' | 'particles' | 
  'blueprint' | 'graph' | 'circuit' | 'topography' | 'banknote' | 'microchip';

type ShapeType = 'orb' | 'blob' | 'hexagon' | 'geometric' | 'sharp' | 'flow' | 'spotlight' | 'frame' | 'none';
type FloatingType = 'none' | 'sparkles' | 'stars' | 'hearts' | 'code' | 'money' | 'music';

type VisualStyle = 'cyber' | 'organic' | 'geometric' | 'playful' | 'glassmorphism' | 'minimal';
type VisualIntensity = 'low' | 'medium' | 'high';
type DecorationType = 'orb' | 'shape' | 'icon' | 'accent' | 'chart' | 'ui';

interface DecorationElement {
  id: string;
  type: DecorationType;
  style: {
    shape?: 'circle' | 'pill' | 'rect' | 'ring' | 'triangle' | 'blob' | 'pie' | 'bar' | 'line' | 'notification' | 'search' | 'button' | 'toggle';
    gradient?: string;
    color?: string;
    icon?: React.ElementType;
    blur?: number;
    stroke?: boolean;
    border?: boolean;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
  };
  // Position stored as percentage numbers (0-100)
  position: { top: number; left: number; width: number; height: number; rotation: number };
  opacity: number;
  zIndex: number;
  locked?: boolean;
  userModified?: boolean;
}

interface Slide {
  id: number;
  subtitle: string;
  title: string;
  body: string; // Can contain HTML or bullet points
  cta: string;
  image?: string; // Base64 or URL
  imageStyle?: 'cover' | 'circle' | 'framed';
  imagePosition?: 'top' | 'middle' | 'bottom';
  
  showSubtitle: boolean;
  showTitle: boolean;
  showBody: boolean;
  showCta: boolean;
  showImage: boolean;

  layout: SlideLayout;
  
  layoutConfig?: {
    reverseOrder?: boolean; 
    bulletStyle?: 'numbers' | 'dots' | 'checks'; 
    textAlign?: 'left' | 'center' | 'right';
  };

  decorations?: DecorationElement[]; 
  decorationOverride?: {
     disabled?: boolean;
     intensity?: VisualIntensity;
  };
}

interface ThemeConfig {
  id: string;
  name: string;
  category: string;
  tags: string[];
  bg: string;
  text: string;
  accentPrimary: string;
  accentSecondary: string;
  fontHeading: string;
  fontBody: string;
  overlayType: PatternType;
  shapeStyle: ShapeType;
}

interface BrandKit {
  activeThemeId: string | null;
  useCustomColors: boolean;
  backgroundColor: string; 
  textColor: string;
  accentColor: string;
  alternateColors: boolean;
  
  fontHeading: string;
  fontBody: string;
  fontScale: number;
  textAlign: 'left' | 'center' | 'right';
  useCustomFonts: boolean;
  
  fontHierarchy: 'low' | 'medium' | 'high';
  textDensity: 'compact' | 'comfortable' | 'spacious';
  uppercaseHeadings: boolean;

  bgOverlayType: PatternType;
  bgShapeStyle: ShapeType;
  bgFloatingElements: FloatingType;
  bgIntensity: number;

  visualsEnabled: boolean;
  visualsIntensity: VisualIntensity;
  visualsStyle: VisualStyle;
  visualsAllowedTypes: DecorationType[];
  visualsAutoPlacement: boolean;

  brandingMode: 'personal' | 'company' | 'both';
  personalName: string;
  personalHandle: string;
  personalAvatar?: string;
  showPersonalName: boolean;
  showPersonalHandle: boolean;
  showPersonalAvatar: boolean;
  companyName: string;
  companyHandle: string;
  companyLogo?: string;
  showCompanyName: boolean;
  showCompanyHandle: boolean;
  showCompanyLogo: boolean;

  showInIntro: boolean;
  showInOutro: boolean;
  showInRegular: boolean;

  swipeMode: 'textAndArrow' | 'arrowOnly';
  introArrowEnabled: boolean;
  introArrowText: string;
  regularArrowEnabled: boolean;
  regularArrowText: string;
  arrowStyle: 'simple' | 'chevron' | 'circle' | 'double' | 'long' | 'big' | 'square' | 'corner' | 'trend' | 'link' | 'pointer' | 'minimal';

  showWatermark: boolean;
  showCounter: boolean;
  introSlideEnabled: boolean;
  outroSlideEnabled: boolean;
}

interface EditorProps {
  navigateTo: (page: Page) => void;
}

type EditorModule = 'import' | 'projects' | 'content' | 'text' | 'colors' | 'background' | 'branding' | 'swipe' | 'order' | 'layout';

const FONTS = [
    { name: 'Inter', value: 'Inter' },
    { name: 'Poppins', value: 'Poppins' },
    { name: 'Roboto', value: 'Roboto' },
    { name: 'Playfair Display', value: 'Playfair Display' },
    { name: 'Montserrat', value: 'Montserrat' },
    { name: 'Oswald', value: 'Oswald' },
    { name: 'Lato', value: 'Lato' },
    { name: 'Open Sans', value: 'Open Sans' },
];

const CURATED_PALETTES = [
  // Dark / Tech
  { category: 'Cyber & Tech', name: 'Midnight Neon', bg: '#0f172a', text: '#f8fafc', accent: '#38bdf8' },
  { category: 'Cyber & Tech', name: 'Matrix', bg: '#022c22', text: '#ecfdf5', accent: '#34d399' },
  { category: 'Cyber & Tech', name: 'Deep Space', bg: '#0f0f12', text: '#ffffff', accent: '#8b5cf6' },
  { category: 'Cyber & Tech', name: 'Cyberpunk', bg: '#1a1a2e', text: '#eaeaea', accent: '#e94560' },
  { category: 'Cyber & Tech', name: 'Hacker', bg: '#000000', text: '#00ff41', accent: '#008f11' },
  { category: 'Cyber & Tech', name: 'Violet Beam', bg: '#240046', text: '#e0aaff', accent: '#9d4edd' },
  
  // Corporate / Trust
  { category: 'Corporate', name: 'Fintech Blue', bg: '#1e3a8a', text: '#ffffff', accent: '#60a5fa' },
  { category: 'Corporate', name: 'Executive', bg: '#1c1917', text: '#fafaf9', accent: '#a8a29e' },
  { category: 'Corporate', name: 'Slate Professional', bg: '#f8fafc', text: '#0f172a', accent: '#334155' },
  { category: 'Corporate', name: 'Trust', bg: '#ffffff', text: '#003366', accent: '#0066cc' },
  { category: 'Corporate', name: 'Law & Order', bg: '#fdfbf7', text: '#2c3e50', accent: '#c0392b' },
  { category: 'Corporate', name: 'Consulting', bg: '#455a64', text: '#eceff1', accent: '#90a4ae' },

  // Warm / Creative
  { category: 'Creative', name: 'Sunset Drive', bg: '#4c0519', text: '#fff1f2', accent: '#fb7185' },
  { category: 'Creative', name: 'Cream & Coffee', bg: '#fffbeb', text: '#451a03', accent: '#d97706' },
  { category: 'Creative', name: 'Coral Reef', bg: '#fff1f2', text: '#881337', accent: '#f43f5e' },
  { category: 'Creative', name: 'Electric Violet', bg: '#2e1065', text: '#faf5ff', accent: '#d8b4fe' },
  { category: 'Creative', name: 'Retro Pop', bg: '#fff9c4', text: '#212121', accent: '#ff4081' },
  { category: 'Creative', name: 'Peach Fuzz', bg: '#ffe5b4', text: '#5d4037', accent: '#ff6f00' },
  { category: 'Creative', name: 'Lemonade', bg: '#fffde7', text: '#f57f17', accent: '#ffd600' },

  // Nature / Wellness
  { category: 'Wellness', name: 'Forest Rain', bg: '#064e3b', text: '#ecfdf5', accent: '#34d399' },
  { category: 'Wellness', name: 'Sage & Sand', bg: '#f0fdf4', text: '#14532d', accent: '#86efac' },
  { category: 'Wellness', name: 'Ocean Mist', bg: '#ecfeff', text: '#164e63', accent: '#06b6d4' },
  { category: 'Wellness', name: 'Earthy', bg: '#efebe9', text: '#3e2723', accent: '#8d6e63' },
  { category: 'Wellness', name: 'Mint Fresh', bg: '#e0f2f1', text: '#004d40', accent: '#26a69a' },
  { category: 'Wellness', name: 'Lavender', bg: '#f3e5f5', text: '#4a148c', accent: '#ab47bc' },

  // Luxury / High End
  { category: 'Luxury', name: 'Gold Standard', bg: '#000000', text: '#ffffff', accent: '#fbbf24' },
  { category: 'Luxury', name: 'Royal Velvet', bg: '#2e1065', text: '#ffffff', accent: '#c084fc' },
  { category: 'Luxury', name: 'Platinum', bg: '#f8fafc', text: '#334155', accent: '#94a3b8' },
  { category: 'Luxury', name: 'Rose Gold', bg: '#1a1a1a', text: '#ffe4e1', accent: '#d4af37' },
  { category: 'Luxury', name: 'Midnight Silk', bg: '#0a0a12', text: '#e0e0e0', accent: '#7b1fa2' },
  { category: 'Luxury', name: 'Marble', bg: '#f5f5f5', text: '#212121', accent: '#bdbdbd' },

  // Minimal
  { category: 'Minimal', name: 'Paper White', bg: '#ffffff', text: '#111827', accent: '#111827' },
  { category: 'Minimal', name: 'Charcoal', bg: '#262626', text: '#f5f5f5', accent: '#525252' },
  { category: 'Minimal', name: 'Soft Grey', bg: '#f3f4f6', text: '#111827', accent: '#6b7280' },
  { category: 'Minimal', name: 'Monochrome', bg: '#000000', text: '#ffffff', accent: '#ffffff' },
  { category: 'Minimal', name: 'Beige', bg: '#f5f5dc', text: '#4a4a4a', accent: '#8b8b83' },
  { category: 'Minimal', name: 'Swiss', bg: '#ffffff', text: '#000000', accent: '#d50000' },
];

const COLOR_SCENARIOS = [
    { title: "Increase Trust", desc: "Blue instills confidence. Used by 80% of banks.", colors: { bg: '#eff6ff', text: '#172554', accent: '#2563eb' }, icon: Briefcase },
    { title: "Create Urgency", desc: "Red increases heart rate. Good for sales.", colors: { bg: '#fef2f2', text: '#7f1d1d', accent: '#dc2626' }, icon: Activity },
    { title: "Health & Calm", desc: "Green reduces anxiety. Perfect for wellness.", colors: { bg: '#f0fdf4', text: '#14532d', accent: '#16a34a' }, icon: Leaf },
    { title: "High-End Luxury", desc: "Black & Gold implies exclusivity and value.", colors: { bg: '#0a0a0a', text: '#fafafa', accent: '#d4af37' }, icon: Crown },
    { title: "Gen Z Energy", desc: "Acid Green & Black pops on social feeds.", colors: { bg: '#000000', text: '#ccff00', accent: '#ccff00' }, icon: Zap },
    { title: "Optimism", desc: "Yellow grabs attention and evokes happiness.", colors: { bg: '#fffbeb', text: '#451a03', accent: '#f59e0b' }, icon: Sun },
    { title: "Innovation", desc: "Purple represents creativity and wisdom.", colors: { bg: '#f3e5f5', text: '#4a148c', accent: '#8e24aa' }, icon: Lightbulb },
    { title: "Reliability", desc: "Grey and Blue represents stability.", colors: { bg: '#eceff1', text: '#263238', accent: '#607d8b' }, icon: CheckSquare },
];

const BG_PATTERNS: {id: PatternType, label: string, icon?: React.ReactNode}[] = [
  { id: 'none', label: 'Clean', icon: <X size={14}/> },
  { id: 'grid', label: 'Grid', icon: <Grid2X2 size={14}/> },
  { id: 'dots', label: 'Dots', icon: <Grip size={14}/> },
  { id: 'blueprint', label: 'Blueprint', icon: <PenTool size={14}/> },
  { id: 'graph', label: 'Graph', icon: <Grid3X3 size={14}/> },
  { id: 'lines-h', label: 'H-Lines', icon: <AlignJustify size={14} className="rotate-90"/> },
  { id: 'lines-v', label: 'V-Lines', icon: <AlignJustify size={14}/> },
  { id: 'diagonal-thin', label: 'Diag Thin', icon: <Slash size={14}/> },
  { id: 'diagonal-thick', label: 'Diag Thick', icon: <Slash size={14} strokeWidth={3}/> },
  { id: 'checkboard', label: 'Checker', icon: <Grid3X3 size={14}/> },
  { id: 'polka', label: 'Polka', icon: <Circle size={14} className="fill-current"/> },
  { id: 'plus', label: 'Pluses', icon: <Plus size={14}/> },
  { id: 'crosshatch', label: 'Hatch', icon: <Grid2X2 size={14}/> },
  { id: 'waves', label: 'Waves', icon: <Waves size={14}/> },
  { id: 'zigzag', label: 'ZigZag', icon: <Activity size={14}/> },
  { id: 'hex', label: 'Hexagon', icon: <Hexagon size={14}/> },
  { id: 'topography', label: 'Topo', icon: <Wind size={14}/> },
  { id: 'circuit', label: 'Circuit', icon: <Cpu size={14}/> },
  { id: 'microchip', label: 'Chip', icon: <Cpu size={14}/> },
  { id: 'banknote', label: 'Money', icon: <DollarSign size={14}/> },
  { id: 'vignette', label: 'Vignette', icon: <Maximize size={14}/> },
  { id: 'noise', label: 'Noise', icon: <Zap size={14}/> },
  { id: 'glass', label: 'Glass', icon: <Droplet size={14}/> },
  { id: 'mesh', label: 'Mesh', icon: <Aperture size={14}/> },
  { id: 'particles', label: 'Dust', icon: <Star size={14}/> },
];

const FUTURISTIC_THEMES: ThemeConfig[] = [
  {
    id: 'neon-nova',
    name: 'Neon Nova',
    category: 'Tech',
    tags: ['Dark', 'Vibrant'],
    bg: 'linear-gradient(135deg, #050816 0%, #1a103c 100%)', 
    text: '#F9FAFB',
    accentPrimary: '#7C3AED', 
    accentSecondary: '#22D3EE', 
    fontHeading: 'Poppins',
    fontBody: 'Inter',
    overlayType: 'grid',
    shapeStyle: 'orb'
  },
  {
    id: 'clean-slate',
    name: 'Clean Slate',
    category: 'Minimal',
    tags: ['Light', 'Clean'],
    bg: '#F8FAFC',
    text: '#0F172A',
    accentPrimary: '#334155',
    accentSecondary: '#94A3B8',
    fontHeading: 'Inter',
    fontBody: 'Roboto',
    overlayType: 'none',
    shapeStyle: 'none'
  },
  {
    id: 'fintech-trust',
    name: 'Fintech Trust',
    category: 'Professional',
    tags: ['Blue', 'Trust'],
    bg: '#1E3A8A',
    text: '#FFFFFF',
    accentPrimary: '#60A5FA',
    accentSecondary: '#93C5FD',
    fontHeading: 'Montserrat',
    fontBody: 'Inter',
    overlayType: 'dots',
    shapeStyle: 'geometric'
  },
];

const ARROW_ICONS: Record<string, React.ElementType> = {
  'simple': ArrowRight,
  'circle': ArrowRightCircle,
  'long': MoveRight,
  'trend': TrendingUp,
  'link': ExternalLink,
  'pointer': MousePointer2,
};

const DEFAULT_BRANDING: BrandKit = {
  activeThemeId: 'neon-nova',
  fontHeading: 'Poppins',
  fontBody: 'Inter',
  fontScale: 1.0,
  textAlign: 'left',
  useCustomFonts: false,
  fontHierarchy: 'medium',
  textDensity: 'comfortable',
  uppercaseHeadings: false,
  
  useCustomColors: false,
  backgroundColor: '#050816',
  textColor: '#F9FAFB',
  accentColor: '#7C3AED',
  alternateColors: false,

  bgOverlayType: 'grid',
  bgShapeStyle: 'orb',
  bgFloatingElements: 'none',
  bgIntensity: 0.5,

  visualsEnabled: true,
  visualsIntensity: 'medium',
  visualsStyle: 'cyber',
  visualsAllowedTypes: ['orb', 'shape', 'icon', 'accent'],
  visualsAutoPlacement: true,
  
  brandingMode: 'personal',
  personalName: 'John Doe',
  personalHandle: '@johndoe',
  personalAvatar: undefined,
  showPersonalName: false,
  showPersonalHandle: true,
  showPersonalAvatar: true,
  companyName: 'Acme Inc.',
  companyHandle: 'acme.com',
  companyLogo: undefined,
  showCompanyName: true,
  showCompanyHandle: true,
  showCompanyLogo: true,

  showInIntro: true,
  showInOutro: true,
  showInRegular: true,

  swipeMode: 'textAndArrow',
  introArrowEnabled: true,
  introArrowText: 'Swipe to start',
  regularArrowEnabled: true,
  regularArrowText: 'Swipe',
  arrowStyle: 'circle',

  showWatermark: false,
  showCounter: true,
  introSlideEnabled: true,
  outroSlideEnabled: true,
};

const LAYOUT_DEFINITIONS: {
  id: SlideLayout;
  label: string;
  category: string;
  icon: React.ReactNode;
}[] = [
  { id: 'hook', label: 'Viral Hook', category: 'opener', icon: <Zap size={20} /> },
  { id: 'center', label: 'Center', category: 'content', icon: <AlignCenter size={20} /> },
  { id: 'list', label: 'List', category: 'content', icon: <List size={20} /> },
  { id: 'two-col', label: 'Split', category: 'visual', icon: <SplitSquareHorizontal size={20} /> },
  { id: 'image-left', label: 'Image Left', category: 'visual', icon: <ImageIcon size={20} /> },
  { id: 'stat', label: 'Stat', category: 'content', icon: <TrendingUp size={20} /> },
  { id: 'quote', label: 'Quote', category: 'content', icon: <FileText size={20} /> },
  { id: 'cta', label: 'CTA', category: 'closer', icon: <MousePointer2 size={20} /> },
];

const MODES = [
  { id: 'topic', label: 'Idea', icon: <Lightbulb size={20} />, desc: 'Generate from a topic' },
  { id: 'url', label: 'URL', icon: <Link size={20} />, desc: 'Content from link' },
  { id: 'facts', label: 'Facts', icon: <BookOpen size={20} />, desc: 'Real-world data & trivia' },
  { id: 'scenario', label: 'Scenario', icon: <MessageCircle size={20} />, desc: 'Storytelling & case studies' },
  { id: 'data', label: 'Data', icon: <BarChart3 size={20} />, desc: 'Trends & statistics' },
  { id: 'text', label: 'Text', icon: <FileText size={20} />, desc: 'Summarize long text' },
  { id: 'remix', label: 'Remix', icon: <Paintbrush size={20} />, desc: 'Style transfer' },
];

// --- HELPER FUNCTIONS ---

const seededRandom = (seed: number) => {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

const hexToRgba = (hex: string, alpha: number) => {
    let r = 0, g = 0, b = 0;
    if (hex.startsWith('#')) hex = hex.slice(1);
    if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
        r = parseInt(hex.slice(0, 2), 16);
        g = parseInt(hex.slice(2, 4), 16);
        b = parseInt(hex.slice(4, 6), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const getPatternStyle = (type: PatternType, color: string, intensity: number = 0.5): React.CSSProperties => {
    const c = color; 
    const op = Math.max(0.03, intensity * 0.15); // Base opacity scaling
    
    switch(type) {
        case 'grid': 
            return { backgroundImage: `linear-gradient(${c} 1px, transparent 1px), linear-gradient(90deg, ${c} 1px, transparent 1px)`, backgroundSize: '40px 40px', opacity: op };
        case 'dots': 
            return { backgroundImage: `radial-gradient(${c} 1px, transparent 1px)`, backgroundSize: '20px 20px', opacity: op };
        case 'lines-h':
            return { backgroundImage: `repeating-linear-gradient(0deg, ${c}, ${c} 1px, transparent 1px, transparent 20px)`, opacity: op };
        case 'lines-v':
            return { backgroundImage: `repeating-linear-gradient(90deg, ${c}, ${c} 1px, transparent 1px, transparent 20px)`, opacity: op };
        case 'diagonal-thin':
            return { backgroundImage: `repeating-linear-gradient(45deg, ${c}, ${c} 1px, transparent 1px, transparent 10px)`, opacity: op };
        case 'diagonal-thick':
             return { backgroundImage: `repeating-linear-gradient(-45deg, ${c}, ${c} 2px, transparent 2px, transparent 20px)`, opacity: op };
        case 'checkboard':
            return { backgroundImage: `linear-gradient(45deg, ${c} 25%, transparent 25%), linear-gradient(-45deg, ${c} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${c} 75%), linear-gradient(-45deg, transparent 75%, ${c} 75%)`, backgroundSize: '40px 40px', backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px', opacity: op * 0.5 };
        case 'polka':
             return { backgroundImage: `radial-gradient(${c} 3px, transparent 3px)`, backgroundSize: '40px 40px', backgroundPosition: '0 0, 20px 20px', opacity: op };
        case 'plus':
             return { backgroundImage: `linear-gradient(${c} 2px, transparent 2px), linear-gradient(90deg, ${c} 2px, transparent 2px)`, backgroundSize: '60px 60px', backgroundPosition: '-1px -1px', opacity: op };
        case 'crosshatch':
             return { backgroundImage: `linear-gradient(45deg, ${c} 25%, transparent 25%, transparent 75%, ${c} 75%, ${c}), linear-gradient(45deg, ${c} 25%, transparent 25%, transparent 75%, ${c} 75%, ${c})`, backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px', opacity: op * 0.5 };
        case 'waves':
             return { backgroundImage: `radial-gradient(circle at 100% 50%, transparent 20%, ${c} 21%, ${c} 34%, transparent 35%, transparent), radial-gradient(circle at 0% 50%, transparent 20%, ${c} 21%, ${c} 34%, transparent 35%, transparent)`, backgroundSize: '40px 40px', backgroundPosition: '0 0, 20px 20px', opacity: op };
        case 'zigzag':
             return { backgroundImage: `linear-gradient(135deg, ${c} 25%, transparent 25%), linear-gradient(225deg, ${c} 25%, transparent 25%), linear-gradient(45deg, ${c} 25%, transparent 25%), linear-gradient(315deg, ${c} 25%, transparent 25%)`, backgroundPosition: '20px 0, 20px 0, 0 0, 0 0', backgroundSize: '40px 40px', opacity: op };
        case 'hex':
             return { backgroundImage: `radial-gradient(circle, transparent 60%, ${c} 60%, ${c} 65%, transparent 65%)`, backgroundSize: '40px 40px', opacity: op };
        case 'blueprint':
             return { backgroundImage: `linear-gradient(${c} 2px, transparent 2px), linear-gradient(90deg, ${c} 2px, transparent 2px), linear-gradient(${c} 1px, transparent 1px), linear-gradient(90deg, ${c} 1px, transparent 1px)`, backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px', opacity: op };
        case 'graph':
             return { backgroundImage: `linear-gradient(${c} 1px, transparent 1px), linear-gradient(90deg, ${c} 1px, transparent 1px)`, backgroundSize: '10px 10px', opacity: op };
        case 'circuit':
             return { backgroundImage: `radial-gradient(${c} 2px, transparent 3px), linear-gradient(0deg, transparent 95%, ${c} 95%), linear-gradient(90deg, transparent 95%, ${c} 95%)`, backgroundSize: '40px 40px', opacity: op };
        case 'noise':
             return { backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`, opacity: intensity * 0.3, mixBlendMode: 'overlay' };
        case 'vignette':
             return { backgroundImage: `radial-gradient(circle, transparent 50%, ${c} 150%)`, opacity: op * 2 };
        case 'glass':
             return { backdropFilter: 'blur(10px)', backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))`, opacity: 1 };
        default:
             return {};
    }
}

const generateSmartDecorations = (slide: Slide, branding: BrandKit): DecorationElement[] => {
    if (!branding.visualsEnabled || !branding.visualsAutoPlacement) return [];
    if (slide.decorationOverride?.disabled) return [];

    const seed = slide.id;
    const intensityLevel = slide.decorationOverride?.intensity || branding.visualsIntensity;
    const count = intensityLevel === 'low' ? 2 : intensityLevel === 'medium' ? 4 : 6;
    
    const elements: DecorationElement[] = [];
    
    const isCenterBlocked = ['hook','center','cta','quote','stat'].includes(slide.layout);

    for (let i = 0; i < count; i++) {
        const r = seededRandom(seed + i);
        const r2 = seededRandom(seed + i + 100);
        
        let type: DecorationElement['type'] = 'shape';
        const allowed = branding.visualsAllowedTypes;

        if (allowed.length > 0) {
            if (branding.visualsStyle === 'cyber') type = r > 0.6 ? 'shape' : 'accent';
            else if (branding.visualsStyle === 'organic') type = r > 0.5 ? 'orb' : 'shape';
            else type = allowed[Math.floor(r * allowed.length)];
        } else {
             continue;
        }

        let top = r * 90;
        let left = r2 * 90;
        
        if (isCenterBlocked) {
             if (left > 30 && left < 70) left = r2 > 0.5 ? 10 + r2*10 : 80 + r2*10;
             if (top > 30 && top < 70) top = r > 0.5 ? 10 + r*10 : 80 + r*10;
        }

        const element: DecorationElement = {
            id: `dec-${slide.id}-${i}`,
            type,
            style: {},
            position: { top, left, width: 0, height: 0, rotation: r * 360 },
            opacity: 0.1 + (r * 0.3),
            zIndex: 0
        };

        if (type === 'orb') {
             const size = 30 + (r * 40);
             element.position.width = size; element.position.height = size;
             element.style.color = i % 2 === 0 ? branding.accentColor : branding.textColor; 
             element.style.blur = 60; element.opacity = 0.3;
        } else if (type === 'shape') {
            const size = 10 + (r * 20);
            element.position.width = size; element.position.height = size;
            element.style.shape = branding.visualsStyle === 'geometric' ? (r > 0.5 ? 'triangle' : 'rect') : (r > 0.5 ? 'circle' : 'pill');
            element.style.stroke = branding.visualsStyle === 'cyber';
            element.style.color = branding.accentColor;
        } else if (type === 'icon') {
             element.position.width = 8; element.position.height = 8;
             element.style.icon = [Star, Sparkles, Heart, Zap, Code][Math.floor(r * 5)];
             element.style.color = branding.accentColor; element.opacity = 0.6;
        } else {
             element.position.width = r > 0.5 ? 20 : 1;
             element.position.height = r > 0.5 ? 1 : 20;
             element.style.color = branding.textColor; element.opacity = 0.2;
        }
        elements.push(element);
    }
    return elements;
}

// --- MAIN COMPONENT ---

export const Editor: React.FC<EditorProps> = ({ navigateTo }) => {
  // --- STATE ---
  const [activeModule, setActiveModule] = useState<EditorModule>('import');
  
  const createInitialSlide = (id: number, isIntro = false, isOutro = false): Slide => ({
    id,
    title: isIntro ? "The Perfect Hook" : isOutro ? "Thanks for reading!" : "Key Point",
    subtitle: isIntro ? "Start Here" : isOutro ? "Conclusion" : "Topic",
    body: isIntro ? "" : isOutro ? "Follow me for more." : "Your content goes here.",
    cta: isOutro ? "Follow" : "",
    layout: isIntro ? 'hook' : isOutro ? 'cta' : 'two-col',
    showTitle: true, showSubtitle: true, showBody: !isIntro, showCta: isOutro, showImage: false,
    imageStyle: 'cover',
    imagePosition: 'middle',
    layoutConfig: { bulletStyle: 'numbers', reverseOrder: false }
  });

  const [history, setHistory] = useState<{slides: Slide[], branding: BrandKit}[]>([
    { slides: [createInitialSlide(1, true)], branding: DEFAULT_BRANDING }
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  // Viewport State
  const [viewport, setViewport] = useState({ scale: 0.65, offsetX: 0, offsetY: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  
  // Interaction State
  const [selectedDecorationId, setSelectedDecorationId] = useState<string | null>(null);
  const [isDraggingDecoration, setIsDraggingDecoration] = useState(false);
  const decorationDragStartRef = useRef({ x: 0, y: 0, elTop: 0, elLeft: 0 });

  const [projectTitle, setProjectTitle] = useState('Untitled Carousel');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '4:5' | '9:16'>('4:5');

  // AI State
  const [aiMode, setAiMode] = useState<'topic' | 'url' | 'text' | 'facts' | 'scenario' | 'data' | 'remix'>('topic');
  const [aiPrompt, setAiPrompt] = useState(''); 
  const [aiText, setAiText] = useState('');     
  const [targetAudience, setTargetAudience] = useState('');
  const [emotionalHook, setEmotionalHook] = useState('Curiosity');
  const [slideCount, setSlideCount] = useState(5);
  const [language, setLanguage] = useState('English');
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  
  // Slide Rewrite Context
  const [slideRewriteContext, setSlideRewriteContext] = useState('');
  
  // Remix / Inspiration State
  const [inspirationImage, setInspirationImage] = useState<string | null>(null);
  
  // UI State
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');

  const logoInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const contentImageRef = useRef<HTMLInputElement>(null);
  const inspirationInputRef = useRef<HTMLInputElement>(null);

  const currentState = history[historyIndex];
  const slides = currentState.slides;
  const branding = currentState.branding;
  const activeSlide = slides[currentSlideIndex] || slides[0];

  // Resolve Effective Branding
  const activeTheme = FUTURISTIC_THEMES.find(t => t.id === branding.activeThemeId) || FUTURISTIC_THEMES[0];
  
  // Alternate colors logic
  const isAlternate = branding.alternateColors && ((currentSlideIndex + 1) % 2 === 0);
  
  let effectiveBg = branding.useCustomColors ? branding.backgroundColor : activeTheme.bg;
  let effectiveText = branding.useCustomColors ? branding.textColor : activeTheme.text;
  const effectiveAccentPrimary = branding.useCustomColors ? branding.accentColor : activeTheme.accentPrimary;
  const effectiveAccentSecondary = branding.useCustomColors ? branding.accentColor : activeTheme.accentSecondary;
  
  if (isAlternate) {
     const temp = effectiveBg;
     effectiveBg = effectiveText;
     effectiveText = temp;
  }

  const effectiveFontHeading = branding.useCustomFonts ? branding.fontHeading : activeTheme.fontHeading;
  const effectiveFontBody = branding.useCustomFonts ? branding.fontBody : activeTheme.fontBody;
  const effectivePattern = branding.bgOverlayType;
  const effectiveShape = branding.bgShapeStyle;
  const intensity = branding.bgIntensity || 0.5;

  // --- CANVAS DIMENSIONS ---
  const getCanvasDimensions = () => {
    const width = 400;
    let height = 500;
    if (aspectRatio === '1:1') height = 400;
    if (aspectRatio === '9:16') height = 711;
    return { width, height };
  };
  const { width: baseW, height: baseH } = getCanvasDimensions();

  // --- HANDLERS ---
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.05 : 0.05;
        setViewport(prev => ({ ...prev, scale: Math.min(2.5, Math.max(0.1, prev.scale + delta)) }));
    } else if (Math.abs(e.deltaX) > 0 || Math.abs(e.deltaY) > 0) {
        e.preventDefault();
        setViewport(prev => ({ ...prev, offsetX: prev.offsetX - e.deltaX, offsetY: prev.offsetY - e.deltaY }));
    }
  }, []);

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
     if (e.button === 1 || e.shiftKey || isPanning) {
         e.preventDefault(); setIsPanning(true);
         dragStartRef.current = { x: e.clientX, y: e.clientY };
     } else {
         setSelectedDecorationId(null);
     }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
      if (isPanning) {
          const dx = e.clientX - dragStartRef.current.x;
          const dy = e.clientY - dragStartRef.current.y;
          setViewport(prev => ({ ...prev, offsetX: prev.offsetX + dx, offsetY: prev.offsetY + dy }));
          dragStartRef.current = { x: e.clientX, y: e.clientY };
      }
      
      if (isDraggingDecoration && selectedDecorationId) {
          const dx = (e.clientX - decorationDragStartRef.current.x) / viewport.scale;
          const dy = (e.clientY - decorationDragStartRef.current.y) / viewport.scale;
          const dPercX = (dx / baseW) * 100;
          const dPercY = (dy / baseH) * 100;

          const newSlides = [...slides];
          const slide = newSlides[currentSlideIndex];
          if (!slide.decorations) slide.decorations = [];
          
          const decIndex = slide.decorations.findIndex(d => d.id === selectedDecorationId);
          if (decIndex !== -1) {
              const el = slide.decorations[decIndex];
              el.position.left = decorationDragStartRef.current.elLeft + dPercX;
              el.position.top = decorationDragStartRef.current.elTop + dPercY;
              el.userModified = true;
              setHistory(prev => { const h = [...prev]; h[historyIndex].slides = newSlides; return h; });
          }
      }
  };

  const handleMouseUp = () => {
      if (isPanning) setIsPanning(false);
      if (isDraggingDecoration) { setIsDraggingDecoration(false); pushHistory(slides, branding); }
  };

  // --- IMAGE UPLOAD HANDLER ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'slide' | 'avatar' | 'logo' | 'inspiration') => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
          const result = event.target?.result as string;
          
          if (target === 'slide') {
              const newSlides = [...slides];
              newSlides[currentSlideIndex].image = result;
              newSlides[currentSlideIndex].showImage = true;
              updateSlides(newSlides);
          } else if (target === 'avatar') {
              updateBranding({ personalAvatar: result, showPersonalAvatar: true });
          } else if (target === 'logo') {
              updateBranding({ companyLogo: result, showCompanyLogo: true });
          } else if (target === 'inspiration') {
              setInspirationImage(result);
          }
      };
      reader.readAsDataURL(file);
      e.target.value = '';
  };

  // --- DECORATION LOGIC ---
  useEffect(() => {
     const currentSlide = slides[currentSlideIndex];
     if (branding.visualsEnabled && branding.visualsAutoPlacement && !currentSlide.decorations) {
         const gen = generateSmartDecorations(currentSlide, branding);
         const newSlides = [...slides];
         newSlides[currentSlideIndex].decorations = gen;
         setHistory(prev => { const h = [...prev]; h[historyIndex].slides = newSlides; return h; });
     }
  }, [currentSlideIndex, branding.visualsStyle, branding.visualsIntensity, branding.visualsEnabled]);

  const handleDecorationMouseDown = (e: React.MouseEvent, decId: string, locked: boolean) => {
      e.stopPropagation();
      if (locked) return;
      setSelectedDecorationId(decId);
      setIsDraggingDecoration(true);
      decorationDragStartRef.current = { 
          x: e.clientX, y: e.clientY,
          elTop: activeSlide.decorations?.find(d => d.id === decId)?.position.top || 0,
          elLeft: activeSlide.decorations?.find(d => d.id === decId)?.position.left || 0
      };
  };

  const addManualDecoration = (type: 'circle' | 'square' | 'blob' | 'icon' | 'pie' | 'bar' | 'line' | 'ui-button' | 'ui-search' | 'ui-toggle' | 'ui-notif') => {
      const newSlides = [...slides];
      if (!newSlides[currentSlideIndex].decorations) newSlides[currentSlideIndex].decorations = [];
      
      const isUi = type.startsWith('ui-');
      const isChart = ['pie','bar','line'].includes(type);
      
      const newDec: DecorationElement = {
          id: `manual-${Date.now()}`,
          type: isUi ? 'ui' : isChart ? 'chart' : type === 'icon' ? 'icon' : 'shape',
          style: {
              shape: type === 'circle' ? 'circle' : type === 'square' ? 'rect' : type === 'blob' ? 'blob' : 
                     type === 'pie' ? 'pie' : type === 'bar' ? 'bar' : type === 'line' ? 'line' : 
                     type === 'ui-button' ? 'button' : type === 'ui-search' ? 'search' : type === 'ui-toggle' ? 'toggle' : type === 'ui-notif' ? 'notification' : undefined,
              color: branding.accentColor,
              stroke: false,
              border: false,
              borderColor: '#ffffff',
              borderWidth: 2,
              borderRadius: isUi ? 12 : 0,
          },
          position: { top: 50, left: 50, width: 20, height: 20, rotation: 0 },
          opacity: 1,
          zIndex: 10,
          userModified: true
      };
      
      if(type === 'icon') {
          newDec.style.icon = Star;
          newDec.position.width = 10; newDec.position.height = 10;
      }
      if(isChart) {
          newDec.position.width = 40; newDec.position.height = 30;
      }
      if(isUi) {
          newDec.position.width = 40; newDec.position.height = 12;
          if(type === 'ui-button') { newDec.position.width = 30; newDec.position.height = 10; }
          if(type === 'ui-toggle') { newDec.position.width = 12; newDec.position.height = 6; }
          if(type === 'ui-notif') { newDec.position.width = 10; newDec.position.height = 10; newDec.style.color = '#ef4444'; }
      }

      newSlides[currentSlideIndex].decorations?.push(newDec);
      updateSlides(newSlides);
      setSelectedDecorationId(newDec.id);
  };
  
  const updateDecoration = (id: string, updates: Partial<DecorationElement['style']> | Partial<DecorationElement['position']> | { opacity?: number }) => {
      const newSlides = [...slides];
      const slide = newSlides[currentSlideIndex];
      const dec = slide.decorations?.find(d => d.id === id);
      if (dec) {
          // Check if updates are style properties
          if ('color' in updates || 'border' in updates || 'borderColor' in updates || 'borderWidth' in updates || 'borderRadius' in updates) {
               dec.style = { ...dec.style, ...updates as any };
          }
          // Check if updates are position properties
          if ('width' in updates || 'height' in updates) {
               dec.position = { ...dec.position, ...updates as any };
          }
          if ('opacity' in updates) {
              dec.opacity = updates.opacity!;
          }
          updateSlides(newSlides);
      }
  };
  
  const applyDecorationToAllSlides = (id: string) => {
      const sourceDec = activeSlide.decorations?.find(d => d.id === id);
      if (!sourceDec) return;
      
      const newSlides = slides.map((s, idx) => {
          if (idx === currentSlideIndex) return s;
          const newS = { ...s };
          if (!newS.decorations) newS.decorations = [];
          // Check if already exists to avoid dupes? Or just append?
          // Let's append a clone with a new ID
          newS.decorations.push({
              ...sourceDec,
              id: `clone-${sourceDec.id}-${idx}`,
              userModified: true
          });
          return newS;
      });
      updateSlides(newSlides);
  };

  const applyPresetDesign = (presetId: string) => {
       const newSlides = [...slides];
       let decs: DecorationElement[] = [];
       const id = `preset-${Date.now()}`;
       
       if (presetId === 'clear') {
           decs = [];
       } else if (presetId === 'corners') {
           decs = [
               { id: `${id}-1`, type: 'shape', style: { shape: 'rect', color: branding.accentColor, borderRadius: 0 }, position: { top: 10, left: 10, width: 20, height: 2, rotation: 0 }, opacity: 1, zIndex: 0, userModified: true },
               { id: `${id}-2`, type: 'shape', style: { shape: 'rect', color: branding.accentColor, borderRadius: 0 }, position: { top: 10, left: 10, width: 2, height: 10, rotation: 0 }, opacity: 1, zIndex: 0, userModified: true },
               { id: `${id}-3`, type: 'shape', style: { shape: 'rect', color: branding.accentColor, borderRadius: 0 }, position: { top: 90, left: 90, width: 20, height: 2, rotation: 0 }, opacity: 1, zIndex: 0, userModified: true },
               { id: `${id}-4`, type: 'shape', style: { shape: 'rect', color: branding.accentColor, borderRadius: 0 }, position: { top: 90, left: 90, width: 2, height: 10, rotation: 0 }, opacity: 1, zIndex: 0, userModified: true },
           ];
       } else if (presetId === 'blobs') {
           decs = [
               { id: `${id}-1`, type: 'shape', style: { shape: 'blob', color: branding.accentColor, blur: 40 }, position: { top: 20, left: 80, width: 40, height: 40, rotation: 45 }, opacity: 0.3, zIndex: 0, userModified: true },
               { id: `${id}-2`, type: 'shape', style: { shape: 'blob', color: branding.textColor, blur: 40 }, position: { top: 80, left: 20, width: 30, height: 30, rotation: -20 }, opacity: 0.2, zIndex: 0, userModified: true },
           ];
       } else if (presetId === 'tech') {
           decs = [
               { id: `${id}-1`, type: 'shape', style: { shape: 'circle', color: 'transparent', border: true, borderColor: branding.accentColor, borderWidth: 1 }, position: { top: 50, left: 50, width: 60, height: 60, rotation: 0 }, opacity: 0.2, zIndex: 0, userModified: true },
               { id: `${id}-2`, type: 'shape', style: { shape: 'rect', color: branding.accentColor }, position: { top: 50, left: 50, width: 70, height: 1, rotation: 45 }, opacity: 0.2, zIndex: 0, userModified: true },
               { id: `${id}-3`, type: 'shape', style: { shape: 'rect', color: branding.accentColor }, position: { top: 50, left: 50, width: 70, height: 1, rotation: -45 }, opacity: 0.2, zIndex: 0, userModified: true },
           ];
       } else if (presetId === 'finance') {
           decs = [
               { id: `${id}-1`, type: 'chart', style: { shape: 'bar', color: branding.accentColor }, position: { top: 80, left: 80, width: 30, height: 20, rotation: 0 }, opacity: 0.8, zIndex: 1, userModified: true },
               { id: `${id}-2`, type: 'ui', style: { shape: 'notification', color: '#10b981' }, position: { top: 20, left: 80, width: 8, height: 8, rotation: 0 }, opacity: 1, zIndex: 1, userModified: true },
           ];
       }

       newSlides[currentSlideIndex].decorations = decs;
       newSlides[currentSlideIndex].decorationOverride = { disabled: presetId === 'clear' };
       updateSlides(newSlides);
  }

  // --- AI GENERATION ---
  const handleAiGenerate = async () => {
    if (!aiPrompt && !aiText && aiMode !== 'remix' && aiMode !== 'data' && aiMode !== 'facts' && aiMode !== 'url') {
        setAiError("Please enter a topic or text."); return;
    }
    setAiLoading(true); setAiError(null);

    try {
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        
        // --- ADVANCED PROMPT CONSTRUCTION ---
        let promptContext = "";
        let modeInstruction = "";

        switch (aiMode) {
          case 'topic':
            promptContext = `Topic: ${aiPrompt}`;
            modeInstruction = "Create a standard educational carousel explaining this topic.";
            break;
          case 'url':
            promptContext = `URL: ${aiPrompt}`;
            modeInstruction = "You cannot browse the live web. Infer content/brand from URL structure. Generate a high-value summary.";
            break;
          case 'facts':
            promptContext = `Subject: ${aiPrompt}`;
            modeInstruction = "Generate 5-7 surprising facts/myths. Use 'stat' layout for numbers, 'list' for multiple facts.";
            break;
          case 'scenario':
             promptContext = `Scenario Context: ${aiPrompt}`;
             modeInstruction = "Write a storytelling carousel (Problem -> Agitation -> Solution). Use 'quote' for dialogue.";
             break;
          case 'data':
             promptContext = `Industry/Field: ${aiPrompt}`;
             modeInstruction = "Generate a data-driven carousel with realistic stats. Heavily favor 'stat' and 'list' layouts.";
             break;
          case 'text':
             promptContext = `Source Text: ${aiText}`;
             modeInstruction = "Summarize this text into actionable insights.";
             break;
          case 'remix':
             promptContext = `Remix Topic: ${aiPrompt}`;
             modeInstruction = "Create a carousel with a similar vibe to inspiration (if any), focused on the new topic.";
             break;
        }

        const finalPrompt = `
        You are an elite social media strategist and visual designer.
        ${modeInstruction}
        
        INPUTS:
        ${promptContext}
        Target Audience: ${targetAudience || 'General'}
        Emotional Hook: ${emotionalHook}
        Language: ${language}
        Slide Count: ${slideCount}

        Analyze the topic's psychology to generate a relevant Color Palette and Visual Style.
        - Tech/Data -> Dark backgrounds, Neon accents, Geometric/Cyber style, Chart/Shape elements.
        - Health/Nature -> Green/Beige, Organic style, Orb/Shape elements.
        - Business/Professional -> Blue/Slate, Minimal/Geometric style, UI/Icon elements.
        - Creative/Playful -> Bold/Warm, Playful style, Blob/Shape elements.

        OUTPUT FORMAT (JSON OBJECT ONLY):
        {
          "theme": {
            "backgroundColor": "#hex",
            "textColor": "#hex",
            "accentColor": "#hex"
          },
          "visuals": {
             "style": "cyber" | "organic" | "geometric" | "playful" | "glassmorphism" | "minimal",
             "elements": ["orb", "shape", "icon", "accent", "chart", "ui"] 
          },
          "slides": [
            { 
              "layout": "hook" | "two-col" | "list" | "stat" | "quote" | "cta" | "center",
              "title": "Short Heading",
              "subtitle": "Eyebrow text", 
              "body": "Main content (< 30 words, use <br/>)", 
              "cta": "Button label (optional)"
            }
          ]
        }

        LAYOUT RULES:
        - Slide 1 MUST be layout: "hook".
        - Last Slide MUST be layout: "cta".
        - If 'facts' mode, use 'stat' layout for at least 2 slides.
        - If 'scenario' mode, use 'quote' layout for at least 1 slide.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: finalPrompt,
            config: { responseMimeType: "application/json" }
        });

        const text = response.text;
        if (!text) throw new Error("No response from AI");

        // CLEANUP JSON ROBUSTLY
        let jsonString = text.replace(/```json|```/g, '').trim();
        const firstBrace = jsonString.indexOf('{');
        const lastBrace = jsonString.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1) {
            jsonString = jsonString.substring(firstBrace, lastBrace + 1);
        }

        let data;
        try {
            data = JSON.parse(jsonString);
        } catch (parseError) {
             console.error("JSON Parse Error:", parseError, jsonString);
             throw new Error("Failed to parse AI response. Please try again.");
        }
        
        // Handle response
        let slidesData = [];
        let generatedTheme = null;
        let generatedVisuals = null;

        if (Array.isArray(data)) {
             slidesData = data;
        } else if (data.slides) {
             slidesData = data.slides;
             generatedTheme = data.theme;
             generatedVisuals = data.visuals;
        } else {
             // Fallback for unexpected structure
             if (data.title || data.body) slidesData = [data]; 
             else throw new Error("Invalid format received from AI.");
        }

        const newSlides: Slide[] = slidesData.map((s: any, i: number) => ({
            id: Date.now() + i,
            title: s.title || "Untitled", subtitle: s.subtitle || `0${i+1}`,
            body: s.body || "", cta: s.cta || "",
            layout: s.layout || 'center',
            showTitle: true, showSubtitle: true, showBody: !!s.body, showCta: !!s.cta, showImage: ['two-col','image-left'].includes(s.layout),
            imageStyle: 'cover',
            imagePosition: 'middle',
            layoutConfig: { bulletStyle: 'numbers', reverseOrder: false }
        }));

        // Apply Branding
        let newBranding = { ...branding };
        if (generatedTheme) {
             newBranding.useCustomColors = true;
             newBranding.backgroundColor = generatedTheme.backgroundColor || newBranding.backgroundColor;
             newBranding.textColor = generatedTheme.textColor || newBranding.textColor;
             newBranding.accentColor = generatedTheme.accentColor || newBranding.accentColor;
        }
        if (generatedVisuals) {
             newBranding.visualsEnabled = true;
             newBranding.visualsAutoPlacement = true;
             if (generatedVisuals.style) newBranding.visualsStyle = generatedVisuals.style;
             if (generatedVisuals.elements && Array.isArray(generatedVisuals.elements)) {
                 newBranding.visualsAllowedTypes = generatedVisuals.elements;
             }
        }

        pushHistory(newSlides, newBranding);
        setActiveModule('content');
        setCurrentSlideIndex(0);

    } catch (err: any) {
        setAiError(err.message || "Generation failed. Please check your inputs.");
        console.error(err);
    } finally {
        setAiLoading(false);
    }
  };

  const handleContentRewrite = async (mode: 'punchy' | 'story' | 'data' | 'fact' | 'fix') => {
    setAiLoading(true);
    setAiError(null);
    try {
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const slide = slides[currentSlideIndex];
        const context = slideRewriteContext || projectTitle || "General Business";
        const currentContent = `Title: ${slide.title}\nBody: ${slide.body}\nSubtitle: ${slide.subtitle}`;
        
        let instruction = "";
        let layoutHint = "";
        
        switch(mode) {
            case 'punchy':
                instruction = "Make the content concise, impactful, and viral. Use strong verbs. Shorten sentences.";
                break;
            case 'story':
                instruction = "Rewrite this as a mini-story or scenario. Use a 'Situation -> Action' structure or dialogue.";
                layoutHint = "Prefer 'quote' layout if appropriate.";
                break;
            case 'data':
                instruction = "Inject a realistic (simulated) statistic, percentage, or data point relevant to the context. Focus on the number.";
                layoutHint = "Prefer 'stat' layout.";
                break;
            case 'fact':
                instruction = "Replace with a surprising or counter-intuitive fact related to the topic/context.";
                layoutHint = "Prefer 'list' or 'center' layout.";
                break;
            case 'fix':
                instruction = "Fix grammar, improve clarity, and make professional.";
                break;
        }

        const prompt = `
        Role: Social Media Editor.
        Task: ${instruction}
        Context: ${context}
        Current Slide Content:
        ${currentContent}

        Return a valid JSON object with fields: title, subtitle, body.
        Keep text lengths appropriate for a carousel slide (concise).
        Do not include markdown formatting code blocks.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });
        
        const text = response.text;
        if (!text) throw new Error("No response");
        
        // CLEANUP JSON
        const cleanText = text.replace(/```json|```/g, '').trim();
        const json = JSON.parse(cleanText);
        
        const newSlides = [...slides];
        if (json.title) newSlides[currentSlideIndex].title = json.title;
        if (json.subtitle) newSlides[currentSlideIndex].subtitle = json.subtitle;
        if (json.body) newSlides[currentSlideIndex].body = json.body;
        
        if (mode === 'data' && activeSlide.layout !== 'stat') {
             newSlides[currentSlideIndex].layout = 'stat';
        }
        if (mode === 'story' && activeSlide.layout !== 'quote') {
            newSlides[currentSlideIndex].layout = 'quote';
       }
        
        updateSlides(newSlides);

    } catch (e) {
        console.error(e);
        setAiError("Could not enhance content. Try a different input.");
    } finally {
        setAiLoading(false);
    }
  };

  const handleSmartTextGen = async (type: 'stat' | 'fact' | 'analogy' | 'myth' | 'story' | 'steps' | 'quote') => {
    setAiLoading(true);
    setAiError(null);
    try {
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const slide = slides[currentSlideIndex];
        const context = slideRewriteContext || slide.title || projectTitle || "General Business";
        
        let prompt = "";
        
        switch (type) {
            case 'stat':
                prompt = `Generate a realistic, specific statistic relevant to: "${context}". It should include a number or percentage. Format: "Label: [Stat]". Example: "Retention Rate: 85%".`;
                break;
            case 'fact':
                prompt = `Provide a surprising, little-known fact about: "${context}". Keep it under 30 words.`;
                break;
            case 'analogy':
                prompt = `Explain the concept of "${context}" using a simple, relatable analogy. Format: "[Concept] is like [Analogy] because..."`;
                break;
            case 'myth':
                prompt = `Identify a common myth about "${context}" and debunk it. Format: "Myth: [Myth] \nTruth: [Reality]"`;
                break;
            case 'story':
                prompt = `Write a very short 2-sentence scenario about "${context}". Sentence 1: The problem/struggle. Sentence 2: The solution/outcome.`;
                break;
            case 'steps':
                prompt = `Provide 3 actionable steps to achieve success with "${context}". Keep it concise.`;
                break;
             case 'quote':
                prompt = `Generate an inspirational or expert quote relevant to "${context}". Include a fictional or generic attribution if no specific real quote fits.`;
                break;
        }
        
        const finalPrompt = `
        You are a professional social media ghostwriter.
        Task: ${prompt}
        Output: Plain text only. No markdown. No intro.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: finalPrompt,
        });

        const text = response.text?.trim();
        if (!text) throw new Error("No text generated");

        const newSlides = [...slides];
        
        // Intelligence to place text
        if (type === 'stat') {
            const parts = text.split(':');
            if (parts.length > 1) {
                newSlides[currentSlideIndex].title = parts[1].trim(); // The number
                newSlides[currentSlideIndex].subtitle = parts[0].trim(); // The label
                newSlides[currentSlideIndex].layout = 'stat';
            } else {
                 newSlides[currentSlideIndex].title = text;
                 newSlides[currentSlideIndex].layout = 'stat';
            }
        } else if (type === 'myth') {
             newSlides[currentSlideIndex].title = "Myth vs Truth";
             newSlides[currentSlideIndex].body = text;
             newSlides[currentSlideIndex].layout = 'two-col';
        } else if (type === 'steps') {
             newSlides[currentSlideIndex].body = text;
             newSlides[currentSlideIndex].layout = 'list';
             newSlides[currentSlideIndex].layoutConfig = { ...newSlides[currentSlideIndex].layoutConfig, bulletStyle: 'numbers' };
        } else if (type === 'quote') {
            newSlides[currentSlideIndex].title = text.replace(/"/g, '');
            newSlides[currentSlideIndex].layout = 'quote';
        } else {
            newSlides[currentSlideIndex].body = text;
            if(activeSlide.layout === 'stat') newSlides[currentSlideIndex].layout = 'center'; // switch back if it was stat
        }

        updateSlides(newSlides);

    } catch (e) {
        console.error(e);
        setAiError("Generation failed.");
    } finally {
        setAiLoading(false);
    }
  };

  const handleAutoLayout = async () => {
    setAiLoading(true);
    setAiError(null);
    try {
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const slide = slides[currentSlideIndex];
        const content = `Title: ${slide.title}\nSubtitle: ${slide.subtitle}\nBody: ${slide.body}`;
        
        const prompt = `
        Act as a professional designer. Analyze the content below and choose the single best layout from this list:
        - 'hook': If it's a short, catchy title or intro.
        - 'list': If it has multiple steps, points, or bullets.
        - 'stat': If it emphasizes a number, percentage, or currency.
        - 'quote': If it's a statement, review, or has quotation marks.
        - 'two-col': If it compares two things or describes an image.
        - 'center': For general statements or paragraphs.

        Content:
        ${content}

        Return ONLY a JSON object: { "layout": "layout_id" }
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });

        const text = response.text;
        if (!text) throw new Error("No response");
        const cleanText = text.replace(/```json|```/g, '').trim();
        const json = JSON.parse(cleanText);
        
        if (json.layout) {
            const newSlides = [...slides];
            newSlides[currentSlideIndex].layout = json.layout;
            
            // Auto-configure based on layout
            if (json.layout === 'stat') newSlides[currentSlideIndex].showTitle = true;
            if (json.layout === 'list') newSlides[currentSlideIndex].showBody = true;
            
            updateSlides(newSlides);
        }

    } catch (e) {
        console.error(e);
        setAiError("Could not determine layout.");
    } finally {
        setAiLoading(false);
    }
  };

  // --- HISTORY & SAVING ---
  const pushHistory = (newSlides: Slide[], newBranding: BrandKit) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ slides: newSlides, branding: newBranding });
    setHistory(newHistory); setHistoryIndex(newHistory.length - 1); setSaveStatus('unsaved');
  };

  const updateSlides = (newSlides: Slide[]) => pushHistory(newSlides, branding);
  const updateBranding = (newBranding: Partial<BrandKit>) => pushHistory(slides, { ...branding, ...newBranding });
  
  const saveCurrentWork = () => { setSaveStatus('saving'); setTimeout(() => setSaveStatus('saved'), 800); };
  const undo = () => { if (historyIndex > 0) setHistoryIndex(prev => prev - 1); };
  const redo = () => { if (historyIndex < history.length - 1) setHistoryIndex(prev => prev + 1); };

  // --- UNDO/REDO KEYBOARD SHORTCUTS ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
            e.preventDefault();
            if (e.shiftKey) {
                redo();
            } else {
                undo();
            }
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
            e.preventDefault();
            redo();
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history]);

  const handleCreateNew = () => {
      if (saveStatus === 'unsaved') setShowNewProjectDialog(true);
      else resetEditor();
  };

  const resetEditor = () => {
    setHistory([{ slides: [createInitialSlide(Date.now(), true)], branding: DEFAULT_BRANDING }]);
    setHistoryIndex(0); setProjectTitle('Untitled Carousel'); setSaveStatus('saved');
    setCurrentSlideIndex(0); setActiveModule('import'); setAiMode('topic'); setInspirationImage(null);
  };

  const moveSlide = (direction: 'up' | 'down') => {
      const index = currentSlideIndex;
      if (direction === 'up' && index > 0) {
          const newSlides = [...slides];
          [newSlides[index], newSlides[index - 1]] = [newSlides[index - 1], newSlides[index]];
          updateSlides(newSlides);
          setCurrentSlideIndex(index - 1);
      } else if (direction === 'down' && index < slides.length - 1) {
          const newSlides = [...slides];
          [newSlides[index], newSlides[index + 1]] = [newSlides[index + 1], newSlides[index]];
          updateSlides(newSlides);
          setCurrentSlideIndex(index + 1);
      }
  };

  const deleteSlide = () => {
      if (slides.length <= 1) return;
      const newSlides = slides.filter((_, i) => i !== currentSlideIndex);
      updateSlides(newSlides);
      setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1));
  };
  
  // RENDER HELPER FOR IMAGE
  const renderSlideImage = () => (
      activeSlide.showImage && activeSlide.image ? (
         <div className={`shrink-0 overflow-hidden shadow-lg mb-4 ${activeSlide.imageStyle === 'circle' ? 'w-32 h-32 rounded-full border-4 border-white mx-auto' : activeSlide.imageStyle === 'framed' ? 'w-40 h-40 rounded-xl border-4 border-white rotate-3 mx-auto bg-white' : 'w-full h-48 rounded-xl object-cover'}`}>
             <img src={activeSlide.image} className="w-full h-full object-cover"/>
         </div>
      ) : null
  );

  const patternColor = hexToRgba(effectiveText, 0.1 * (branding.bgIntensity || 0.5) * 5);
  const patternStyle = getPatternStyle(effectivePattern, effectiveText, branding.bgIntensity || 0.5);

  // --- RENDER ---
  return (
    <div className="h-screen flex flex-col bg-slate-50 font-sans overflow-hidden text-slate-900 selection:bg-primary-100">
      
      {/* HIDDEN INPUTS */}
      <input type="file" ref={contentImageRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'slide')} />
      <input type="file" ref={avatarInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'avatar')} />
      <input type="file" ref={logoInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'logo')} />
      <input type="file" ref={inspirationInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'inspiration')} />

      {/* --- TOP BAR --- */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-30 shrink-0 relative shadow-sm">
         {/* LEFT: File Actions */}
         <div className="flex items-center gap-4 w-1/3">
            <button onClick={() => navigateTo('home')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
              <Home size={20} />
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="flex gap-2">
                 <button onClick={handleCreateNew} className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
                     <FilePlus size={14}/> New
                 </button>
                 <button onClick={saveCurrentWork} className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
                     <Save size={14}/> {saveStatus === 'saving' ? 'Saving...' : 'Save'}
                 </button>
            </div>
            <div className="h-6 w-px bg-slate-200"></div>
             <div className="flex gap-1">
                 <button onClick={undo} disabled={historyIndex <= 0} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg disabled:opacity-30 transition-all" title="Undo (Ctrl+Z)"><Undo size={16}/></button>
                 <button onClick={redo} disabled={historyIndex >= history.length - 1} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg disabled:opacity-30 transition-all" title="Redo (Ctrl+Y)"><Redo size={16}/></button>
             </div>
         </div>

         {/* CENTER: Project Info & Sizing */}
         <div className="flex items-center gap-6 justify-center w-1/3">
            <input 
              type="text" 
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="text-center font-bold text-slate-800 bg-transparent hover:bg-slate-50 border border-transparent hover:border-slate-200 rounded px-2 py-1 outline-none focus:border-primary-500 w-48 truncate transition-all"
            />
            <div className="flex bg-slate-100 rounded-lg p-1">
                {['1:1', '4:5', '9:16'].map(ratio => (
                    <button 
                        key={ratio}
                        onClick={() => setAspectRatio(ratio as any)}
                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${aspectRatio === ratio ? 'bg-white shadow text-primary-600' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                        {ratio}
                    </button>
                ))}
            </div>
         </div>

         {/* RIGHT: User & Export */}
         <div className="flex items-center justify-end gap-3 w-1/3 relative">
            <button className="flex items-center gap-2 px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-bold shadow-lg shadow-slate-200 transition-all hover:-translate-y-0.5">
                <Download size={14} /> Export
            </button>
            
            <div className="relative">
                <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 p-[2px] cursor-pointer hover:shadow-md transition-all"
                >
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                        {branding.personalAvatar ? <img src={branding.personalAvatar} className="w-full h-full object-cover"/> : <User size={18} className="text-slate-400"/>}
                    </div>
                </button>

                {showUserMenu && (
                    <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-xl border border-slate-100 p-2 animate-in slide-in-from-top-2 fade-in duration-200 z-50">
                        <div className="p-3 border-b border-slate-50">
                             <div className="font-bold text-slate-900">{branding.personalName}</div>
                             <div className="text-xs text-slate-500">{branding.personalHandle}</div>
                             <div className="mt-2 inline-block px-2 py-0.5 bg-primary-50 text-primary-700 text-[10px] font-bold rounded-full uppercase">Pro Plan</div>
                        </div>
                        <div className="p-1 space-y-1">
                             <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg flex items-center gap-2"><CreditCard size={14}/> Billing</button>
                             <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg flex items-center gap-2"><Settings size={14}/> Account</button>
                             <button onClick={() => navigateTo('home')} className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg flex items-center gap-2"><LogOut size={14}/> Log Out</button>
                        </div>
                    </div>
                )}
            </div>
         </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR */}
        <div className="w-20 bg-white border-r border-slate-200 flex flex-col items-center py-6 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] overflow-y-auto hide-scrollbar gap-2">
          {/* Main Modules */}
          {[
            { id: 'import', icon: <ScanFace size={24} />, label: 'Create' },
            { id: 'content', icon: <Layers size={24} />, label: 'Content' },
            { id: 'layout', icon: <Layout size={24} />, label: 'Layout' },
            { id: 'text', icon: <Type size={24} />, label: 'Text' },
            { id: 'colors', icon: <Palette size={24} />, label: 'Colors' },
            { id: 'background', icon: <Grid3X3 size={24} />, label: 'Visuals' },
            { id: 'branding', icon: <Building2 size={24} />, label: 'Brand Kit' },
            { id: 'swipe', icon: <ArrowRightCircle size={24} />, label: 'Swipe' },
            { id: 'order', icon: <ListOrdered size={24} />, label: 'Order' },
          ].map((mod) => (
             <button 
               key={mod.id}
               onClick={() => setActiveModule(mod.id as EditorModule)}
               className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 group relative ${activeModule === mod.id ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'text-slate-400 hover:bg-slate-50 hover:text-primary-600'}`}
             >
                {mod.icon}
                <span className="text-[9px] font-bold">{mod.label}</span>
                {activeModule === mod.id && <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-1 h-8 bg-slate-900 rounded-l-full"></div>}
             </button>
          ))}
          
          {/* Saved Projects moved to bottom */}
          <div className="mt-auto">
              <button 
                  onClick={() => setActiveModule('projects')}
                  className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 group relative ${activeModule === 'projects' ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'text-slate-400 hover:bg-slate-50 hover:text-primary-600'}`}
              >
                  <FolderOpen size={24} />
                  <span className="text-[9px] font-bold">Saved</span>
                  {activeModule === 'projects' && <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-1 h-8 bg-slate-900 rounded-l-full"></div>}
              </button>
          </div>
        </div>

        {/* ACTIVE MODULE PANEL */}
        <div className="w-80 bg-white border-r border-slate-200 flex flex-col z-10 overflow-hidden relative">
           
           {/* LOADING BAR OVERLAY */}
           {aiLoading && (
               <div className="absolute top-0 left-0 right-0 z-50">
                   <div className="h-1 w-full bg-slate-100 overflow-hidden">
                       <div className="h-full bg-primary-500 animate-[scroll_1.5s_ease-in-out_infinite] w-1/3"></div>
                   </div>
               </div>
           )}

           {/* 1. MAGIC CREATE (ENHANCED) */}
           {activeModule === 'import' && (
              <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="p-6 border-b border-slate-50 bg-white sticky top-0 z-10">
                  <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2"><Sparkles className="text-primary-500" size={18}/> Magic Create</h2>
                  <p className="text-xs text-slate-500 mt-1">Generate professional carousels with AI.</p>
                </div>
                
                <div className="p-6 space-y-6 overflow-y-auto pb-24">
                  
                  {/* Mode Grid */}
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-3 block">Choose Mode</label>
                    <div className="grid grid-cols-3 gap-2">
                        {MODES.map(m => (
                            <button 
                              key={m.id} 
                              onClick={() => setAiMode(m.id as any)} 
                              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all border ${aiMode === m.id ? 'bg-primary-50 border-primary-500 text-primary-700 shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-white hover:shadow'}`}
                            >
                                {m.icon}
                                <span className="text-[10px] font-bold mt-1">{m.label}</span>
                            </button>
                        ))}
                    </div>
                  </div>

                  {/* Dynamic Inputs */}
                  <div className="space-y-4">
                      {/* Topic/Facts/Data/URL Input */}
                      {(aiMode === 'topic' || aiMode === 'facts' || aiMode === 'data' || aiMode === 'scenario' || aiMode === 'url') && (
                          <div>
                             <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
                                {aiMode === 'topic' ? 'What is the topic?' : 
                                 aiMode === 'facts' ? 'Subject for facts?' :
                                 aiMode === 'url' ? 'Paste URL' :
                                 aiMode === 'scenario' ? 'Describe the situation' : 'Industry or Field?'}
                             </label>
                             <textarea 
                                className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary-500 focus:bg-white outline-none h-24 text-sm transition-all resize-none"
                                placeholder={
                                  aiMode === 'topic' ? "E.g., 5 ways to improve productivity..." : 
                                  aiMode === 'facts' ? "E.g., Coffee, Space Travel, LinkedIn Algorithm..." :
                                  aiMode === 'url' ? "https://example.com/blog-post" :
                                  aiMode === 'data' ? "E.g., Real Estate Market 2024, SaaS Growth Trends..." :
                                  "E.g., A freelancer struggling to find clients..."
                                }
                                value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)}
                             />
                             {aiMode === 'url' && <div className="text-[10px] text-slate-400 mt-1 italic">Note: AI will analyze structure & brand from the URL.</div>}
                          </div>
                      )}
                      
                      {/* Text Input */}
                      {aiMode === 'text' && (
                          <textarea 
                             className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary-500 focus:bg-white outline-none h-40 text-xs font-mono transition-all resize-none"
                             placeholder="Paste your article, email, or script here..."
                             value={aiText} onChange={(e) => setAiText(e.target.value)}
                          />
                      )}
                      
                      {/* Remix Input */}
                      {aiMode === 'remix' && (
                          <div className="space-y-3">
                              <input 
                                 type="text"
                                 className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary-500 focus:bg-white outline-none text-sm transition-all"
                                 placeholder="Topic for remix..."
                                 value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)}
                              />
                              <div 
                                onClick={() => inspirationInputRef.current?.click()}
                                className="h-24 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer transition-all"
                              >
                                 {inspirationImage ? <img src={inspirationImage} className="h-full object-contain"/> : <><Upload size={20}/><span className="text-xs font-bold mt-2">Upload Style Ref</span></>}
                              </div>
                          </div>
                      )}
                  </div>
                  
                  {/* Advanced Configuration */}
                  <div className="bg-slate-50 p-4 rounded-2xl space-y-4 border border-slate-100">
                      <div>
                          <label className="text-xs font-bold text-slate-400 uppercase mb-2 block flex items-center gap-1"><Users size={12}/> Target Audience</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Beginners, CEOs, Gen Z" 
                            value={targetAudience}
                            onChange={(e) => setTargetAudience(e.target.value)}
                            className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-primary-500"
                          />
                      </div>

                      <div>
                          <label className="text-xs font-bold text-slate-400 uppercase mb-2 block flex items-center gap-1"><Target size={12}/> Emotional Hook</label>
                          <select value={emotionalHook} onChange={(e) => setEmotionalHook(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm outline-none">
                              <option>Curiosity</option>
                              <option>Fear of Missing Out</option>
                              <option>Contrarian / Unpopular Opinion</option>
                              <option>Inspirational</option>
                              <option>Urgency</option>
                              <option>Educational / How-to</option>
                          </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Slides</label>
                              <div className="flex items-center bg-white rounded-lg p-1 border border-slate-200">
                                 <button onClick={() => setSlideCount(Math.max(3, slideCount-1))} className="p-1 hover:bg-slate-100 rounded text-slate-500 font-bold w-8">-</button>
                                 <span className="flex-1 text-center font-bold text-sm">{slideCount}</span>
                                 <button onClick={() => setSlideCount(Math.min(10, slideCount+1))} className="p-1 hover:bg-slate-100 rounded text-slate-500 font-bold w-8">+</button>
                              </div>
                          </div>
                          <div>
                              <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Language</label>
                              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm outline-none">
                                  <option>English</option>
                                  <option>Spanish</option>
                                  <option>French</option>
                                  <option>German</option>
                                  <option>Portuguese</option>
                              </select>
                          </div>
                      </div>
                  </div>

                  <button 
                    disabled={aiLoading}
                    onClick={handleAiGenerate}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-slate-200 group relative overflow-hidden"
                  >
                     {aiLoading ? <Loader2 className="animate-spin" size={20}/> : <Wand2 size={20} className="group-hover:rotate-12 transition-transform"/>}
                     {aiLoading ? 'Magic in progress...' : 'Generate Carousel'}
                  </button>
                  {aiError && <div className="text-xs text-red-500 bg-red-50 p-3 rounded-lg flex gap-2"><AlertCircle size={14}/> {aiError}</div>}
                </div>
              </div>
           )}

           {/* 2. SAVED PROJECTS */}
           {activeModule === 'projects' && (
              <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="p-6 border-b border-slate-50 bg-white sticky top-0 z-10">
                      <h2 className="font-bold text-slate-900 text-lg">Saved Projects</h2>
                      <p className="text-xs text-slate-500 mt-1">Manage your saved carousels.</p>
                  </div>
                  <div className="p-6 space-y-4 overflow-y-auto">
                       {[1, 2, 3].map(i => (
                           <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-primary-500 hover:shadow-md cursor-pointer transition-all group">
                               <div className="flex justify-between items-start mb-2">
                                  <div className="font-bold text-slate-900">Project {i}</div>
                                  <span className="text-[10px] text-slate-400">{i} days ago</span>
                               </div>
                               <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                   <div className="h-full bg-primary-500 w-2/3"></div>
                               </div>
                           </div>
                       ))}
                       <div className="text-center text-xs text-slate-400 mt-8">
                           Projects are saved to your browser's local storage.
                       </div>
                  </div>
              </div>
           )}

           {/* 3. CONTENT EDIT (ENHANCED WITH AI WRITER TOOLS) */}
           {activeModule === 'content' && (
              <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300 relative">
                 <div className="p-6 border-b border-slate-50 bg-white">
                    <h2 className="font-bold text-slate-900 text-lg">Edit Content</h2>
                    <div className="flex items-center gap-3 mt-4">
                        <button onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 disabled:opacity-50"><ChevronLeft size={16}/></button>
                        <span className="text-sm font-bold flex-1 text-center">Slide {currentSlideIndex + 1} of {slides.length}</span>
                        <button onClick={() => setCurrentSlideIndex(Math.min(slides.length-1, currentSlideIndex + 1))} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 disabled:opacity-50"><ChevronRight size={16}/></button>
                    </div>
                 </div>
                 
                 <div className="p-6 space-y-6 overflow-y-auto">
                    {/* AI WRITER TOOLS (Moved from Text) */}
                    <div className="space-y-4">
                       <label className="text-xs font-bold text-slate-400 uppercase block flex items-center gap-1"><Brain size={12}/> AI Writer Tools</label>
                       
                       <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                            <input 
                                type="text" 
                                value={slideRewriteContext} 
                                onChange={(e) => setSlideRewriteContext(e.target.value)} 
                                placeholder="Topic Context (e.g. Q3 Sales, Coffee Facts)" 
                                className="w-full bg-white border border-indigo-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-200"
                            />
                        </div>

                       <div className="grid grid-cols-2 gap-2">
                            {[
                                { id: 'stat', label: 'Real Data', icon: Percent, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
                                { id: 'fact', label: 'Surprise Fact', icon: BookOpenCheck, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
                                { id: 'scenario', label: 'Scenario', icon: GitBranch, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
                                { id: 'myth', label: 'Myth vs Truth', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' },
                                { id: 'steps', label: 'Action Steps', icon: ListChecks, color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-100' },
                                { id: 'quote', label: 'Inspirational Quote', icon: Quote, color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-200' },
                            ].map((tool) => (
                                <button 
                                    key={tool.id}
                                    disabled={aiLoading}
                                    onClick={() => handleSmartTextGen(tool.id as any)}
                                    className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1 transition-all hover:scale-[1.02] active:scale-95 ${tool.bg} ${tool.border} hover:shadow-md`}
                                >
                                    <tool.icon size={16} className={tool.color}/>
                                    <span className={`text-[10px] font-bold ${tool.color}`}>{tool.label}</span>
                                </button>
                            ))}
                       </div>
                       
                       <div className="grid grid-cols-2 gap-2 mt-2">
                             <button disabled={aiLoading} onClick={() => handleContentRewrite('punchy')} className="py-2 px-3 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"><Zap size={12}/> Make Punchy</button>
                             <button disabled={aiLoading} onClick={() => handleContentRewrite('fix')} className="py-2 px-3 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"><Wand2 size={12}/> Fix Grammar</button>
                       </div>
                    </div>

                    <div className="border-t border-slate-100 my-4"></div>

                    {activeSlide.showSubtitle && (
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Subtitle / Eyebrow</label>
                            <input type="text" value={activeSlide.subtitle} onChange={(e) => { const n = [...slides]; n[currentSlideIndex].subtitle = e.target.value; updateSlides(n); }} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-primary-500 transition-all" />
                        </div>
                    )}
                    {activeSlide.showTitle && (
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
                                {activeSlide.layout === 'stat' ? 'Big Number / Stat' : activeSlide.layout === 'quote' ? 'Quote' : 'Headline'}
                            </label>
                            <textarea value={activeSlide.title} onChange={(e) => { const n = [...slides]; n[currentSlideIndex].title = e.target.value; updateSlides(n); }} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-lg font-bold outline-none focus:bg-white focus:border-primary-500 transition-all h-24 resize-none" />
                        </div>
                    )}
                    {activeSlide.showBody && (
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
                                {activeSlide.layout === 'stat' ? 'Label / Description' : activeSlide.layout === 'quote' ? 'Author / Context' : 'Body Text'}
                            </label>
                            <textarea value={activeSlide.body} onChange={(e) => { const n = [...slides]; n[currentSlideIndex].body = e.target.value; updateSlides(n); }} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:bg-white focus:border-primary-500 transition-all h-32 resize-none" />
                        </div>
                    )}
                    {activeSlide.showCta && activeSlide.cta && (
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Call to Action</label>
                            <input type="text" value={activeSlide.cta} onChange={(e) => { const n = [...slides]; n[currentSlideIndex].cta = e.target.value; updateSlides(n); }} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-primary-500 transition-all" />
                        </div>
                    )}

                    {/* NEW MEDIA & ASSETS SECTION */}
                    <div className="pt-6 border-t border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <label className="text-xs font-bold text-slate-400 uppercase block">Media & Assets</label>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-slate-500">{activeSlide.showImage ? 'Enabled' : 'Disabled'}</span>
                                 <button 
                                    onClick={() => { const n = [...slides]; n[currentSlideIndex].showImage = !n[currentSlideIndex].showImage; updateSlides(n); }}
                                    className={`w-8 h-4 rounded-full p-0.5 transition-colors ${activeSlide.showImage ? 'bg-primary-500' : 'bg-slate-200'}`}
                                 >
                                     <div className={`w-3 h-3 rounded-full bg-white shadow-sm transition-transform ${activeSlide.showImage ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                 </button>
                            </div>
                        </div>

                        {activeSlide.showImage && (
                            <div className="space-y-4 animate-in slide-in-from-top-2 fade-in duration-200">
                                {/* Image Upload */}
                                <div onClick={() => contentImageRef.current?.click()} className="h-32 bg-slate-50 border border-dashed border-slate-300 rounded-xl flex items-center justify-center cursor-pointer hover:bg-slate-100 relative overflow-hidden group transition-all">
                                    {activeSlide.image ? <img src={activeSlide.image} className="w-full h-full object-cover"/> : <div className="text-slate-400 flex flex-col items-center"><ImageIcon/><span className="text-[10px] font-bold mt-1">Upload Image</span></div>}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">Change</div>
                                </div>

                                {/* Style Selector */}
                                <div>
                                     <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Image Style</label>
                                     <div className="flex gap-2">
                                         {['cover', 'circle', 'framed'].map((style) => (
                                             <button
                                                key={style}
                                                onClick={() => { const n = [...slides]; n[currentSlideIndex].imageStyle = style as any; updateSlides(n); }}
                                                className={`flex-1 py-2 rounded-lg border text-[10px] font-bold capitalize transition-all ${activeSlide.imageStyle === style ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}
                                             >
                                                 {style}
                                             </button>
                                         ))}
                                     </div>
                                </div>

                                 {/* Position Selector */}
                                 <div>
                                     <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Position</label>
                                     <div className="flex gap-2">
                                         {[
                                             { id: 'top', label: 'Top', icon: AlignVerticalJustifyStart }, 
                                             { id: 'middle', label: 'Middle', icon: AlignVerticalJustifyCenter }, 
                                             { id: 'bottom', label: 'Bottom', icon: AlignVerticalJustifyEnd }
                                         ].map((pos) => (
                                             <button
                                                key={pos.id}
                                                onClick={() => { const n = [...slides]; n[currentSlideIndex].imagePosition = pos.id as any; updateSlides(n); }}
                                                className={`flex-1 py-2 rounded-lg border text-[10px] font-bold capitalize transition-all flex items-center justify-center gap-1 ${activeSlide.imagePosition === pos.id ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}
                                             >
                                                 <pos.icon size={12}/> {pos.label}
                                             </button>
                                         ))}
                                     </div>
                                </div>
                            </div>
                        )}
                    </div>
                 </div>
              </div>
           )}

           {/* 4. VISUALS / BACKGROUND (ENHANCED) */}
           {activeModule === 'background' && (
               <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="p-6 border-b border-slate-50 bg-white">
                        <h2 className="font-bold text-slate-900 text-lg">Visuals & Design</h2>
                        <div className="flex gap-2 mt-4">
                            <button onClick={() => updateBranding({ visualsEnabled: !branding.visualsEnabled })} className={`px-4 py-2 rounded-lg text-xs font-bold flex-1 transition-colors ${branding.visualsEnabled ? 'bg-primary-50 text-primary-700' : 'bg-slate-100 text-slate-500'}`}>{branding.visualsEnabled ? 'On' : 'Off'}</button>
                            <button onClick={() => updateBranding({ visualsAutoPlacement: !branding.visualsAutoPlacement })} className={`px-4 py-2 rounded-lg text-xs font-bold flex-1 transition-colors ${branding.visualsAutoPlacement ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>Auto-Gen</button>
                        </div>
                    </div>
                    
                    <div className="p-6 space-y-8 overflow-y-auto">
                        
                        {/* INSTANT DESIGNS PRESETS */}
                        <div>
                             <label className="text-xs font-bold text-slate-400 uppercase mb-3 block flex items-center gap-1"><Sparkles size={12}/> Instant Design</label>
                             <div className="grid grid-cols-2 gap-2">
                                 {['clear', 'corners', 'blobs', 'tech', 'finance'].map(p => (
                                     <button 
                                         key={p} 
                                         onClick={() => applyPresetDesign(p)}
                                         className="px-3 py-2 bg-slate-50 hover:bg-white border border-slate-200 hover:border-primary-500 rounded-lg text-xs font-bold capitalize text-slate-600 hover:text-primary-600 transition-all"
                                     >
                                         {p === 'clear' ? 'Clear All' : p + ' Style'}
                                     </button>
                                 ))}
                             </div>
                        </div>

                        {/* ELEMENT PROPERTIES EDITOR */}
                        {selectedDecorationId && activeSlide.decorations?.find(d => d.id === selectedDecorationId) && (
                            <div className="bg-slate-900 rounded-xl p-4 text-white animate-in slide-in-from-right-2 mb-6 shadow-xl border border-slate-700">
                                <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
                                     <span className="text-xs font-bold uppercase text-slate-400">Element Properties</span>
                                     <button onClick={() => setSelectedDecorationId(null)} className="text-slate-400 hover:text-white"><X size={14}/></button>
                                </div>
                                <div className="space-y-4">
                                     {/* SIZE */}
                                     <div>
                                         <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                                             <span>Scale</span>
                                         </div>
                                         <input 
                                            type="range" min="1" max="100" step="1"
                                            value={activeSlide.decorations.find(d => d.id === selectedDecorationId)?.position.width || 20}
                                            onChange={(e) => updateDecoration(selectedDecorationId, { width: parseInt(e.target.value), height: parseInt(e.target.value) })}
                                            className="w-full accent-primary-500"
                                         />
                                     </div>
                                     {/* COLORS */}
                                     <div className="grid grid-cols-2 gap-2">
                                         <div>
                                             <label className="text-[10px] font-bold text-slate-400 mb-1 block">Fill</label>
                                             <div className="flex items-center gap-2">
                                                  <input type="color" value={activeSlide.decorations.find(d => d.id === selectedDecorationId)?.style.color || '#000000'} onChange={(e) => updateDecoration(selectedDecorationId, { color: e.target.value })} className="w-8 h-8 rounded border-none bg-transparent cursor-pointer" />
                                                  <span className="text-[10px] font-mono opacity-50">{activeSlide.decorations.find(d => d.id === selectedDecorationId)?.style.color}</span>
                                             </div>
                                         </div>
                                         <div>
                                             <label className="text-[10px] font-bold text-slate-400 mb-1 block">Opacity</label>
                                             <input 
                                                type="range" min="0" max="1" step="0.1"
                                                value={activeSlide.decorations.find(d => d.id === selectedDecorationId)?.opacity || 1}
                                                onChange={(e) => updateDecoration(selectedDecorationId, { opacity: parseFloat(e.target.value) })}
                                                className="w-full accent-primary-500"
                                             />
                                         </div>
                                     </div>
                                     {/* BORDER */}
                                     <div className="border-t border-slate-700 pt-2">
                                         <div className="flex items-center justify-between mb-2">
                                             <label className="text-[10px] font-bold text-slate-400">Border</label>
                                             <button 
                                                onClick={() => updateDecoration(selectedDecorationId, { border: !activeSlide.decorations?.find(d => d.id === selectedDecorationId)?.style.border })}
                                                className={`w-8 h-4 rounded-full p-0.5 transition-colors ${activeSlide.decorations?.find(d => d.id === selectedDecorationId)?.style.border ? 'bg-primary-500' : 'bg-slate-700'}`}
                                             >
                                                 <div className={`w-3 h-3 rounded-full bg-white shadow-sm transition-transform ${activeSlide.decorations?.find(d => d.id === selectedDecorationId)?.style.border ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                             </button>
                                         </div>
                                         {activeSlide.decorations.find(d => d.id === selectedDecorationId)?.style.border && (
                                             <div className="grid grid-cols-2 gap-2">
                                                  <input type="color" value={activeSlide.decorations.find(d => d.id === selectedDecorationId)?.style.borderColor || '#ffffff'} onChange={(e) => updateDecoration(selectedDecorationId, { borderColor: e.target.value })} className="w-full h-6 rounded border-none bg-transparent cursor-pointer" />
                                                  <input type="number" value={activeSlide.decorations.find(d => d.id === selectedDecorationId)?.style.borderWidth || 2} onChange={(e) => updateDecoration(selectedDecorationId, { borderWidth: parseInt(e.target.value) })} className="w-full h-6 bg-slate-800 border border-slate-700 rounded text-xs px-1 text-white" />
                                             </div>
                                         )}
                                     </div>
                                     {/* CORNERS */}
                                     <div>
                                         <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                                             <span>Fade Corners (Radius)</span>
                                         </div>
                                         <input 
                                            type="range" min="0" max="50" step="1"
                                            value={activeSlide.decorations.find(d => d.id === selectedDecorationId)?.style.borderRadius || 0}
                                            onChange={(e) => updateDecoration(selectedDecorationId, { borderRadius: parseInt(e.target.value) })}
                                            className="w-full accent-primary-500"
                                         />
                                     </div>

                                     <button onClick={() => applyDecorationToAllSlides(selectedDecorationId)} className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold text-slate-300 transition-colors flex items-center justify-center gap-2">
                                         <Copy size={12}/> Apply to All Slides
                                     </button>
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase mb-3 block">Add Elements</label>
                            
                            <div className="text-[10px] font-bold text-slate-500 mb-2">Shapes & Icons</div>
                            <div className="grid grid-cols-4 gap-2 mb-4">
                                <button onClick={() => addManualDecoration('circle')} className="aspect-square bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md hover:scale-105 transition-all flex flex-col items-center justify-center text-slate-500 gap-1">
                                    <Circle size={18} /> <span className="text-[9px]">Circle</span>
                                </button>
                                <button onClick={() => addManualDecoration('square')} className="aspect-square bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md hover:scale-105 transition-all flex flex-col items-center justify-center text-slate-500 gap-1">
                                    <Square size={18} /> <span className="text-[9px]">Square</span>
                                </button>
                                <button onClick={() => addManualDecoration('blob')} className="aspect-square bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md hover:scale-105 transition-all flex flex-col items-center justify-center text-slate-500 gap-1">
                                    <Cloud size={18} /> <span className="text-[9px]">Blob</span>
                                </button>
                                <button onClick={() => addManualDecoration('icon')} className="aspect-square bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md hover:scale-105 transition-all flex flex-col items-center justify-center text-slate-500 gap-1">
                                    <Star size={18} /> <span className="text-[9px]">Icon</span>
                                </button>
                            </div>
                            
                            <div className="text-[10px] font-bold text-slate-500 mb-2">Data Widgets</div>
                            <div className="grid grid-cols-4 gap-2 mb-4">
                                <button onClick={() => addManualDecoration('pie')} className="aspect-square bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md hover:scale-105 transition-all flex flex-col items-center justify-center text-slate-500 gap-1">
                                    <PieChart size={18} /> <span className="text-[9px]">Pie</span>
                                </button>
                                <button onClick={() => addManualDecoration('bar')} className="aspect-square bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md hover:scale-105 transition-all flex flex-col items-center justify-center text-slate-500 gap-1">
                                    <BarChart3 size={18} /> <span className="text-[9px]">Bar</span>
                                </button>
                                <button onClick={() => addManualDecoration('line')} className="aspect-square bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md hover:scale-105 transition-all flex flex-col items-center justify-center text-slate-500 gap-1">
                                    <LineChart size={18} /> <span className="text-[9px]">Line</span>
                                </button>
                            </div>

                            <div className="text-[10px] font-bold text-slate-500 mb-2">UI & Scenarios</div>
                            <div className="grid grid-cols-4 gap-2">
                                <button onClick={() => addManualDecoration('ui-button')} className="aspect-square bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md hover:scale-105 transition-all flex flex-col items-center justify-center text-slate-500 gap-1">
                                    <MousePointer size={18} /> <span className="text-[9px]">Button</span>
                                </button>
                                <button onClick={() => addManualDecoration('ui-search')} className="aspect-square bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md hover:scale-105 transition-all flex flex-col items-center justify-center text-slate-500 gap-1">
                                    <Search size={18} /> <span className="text-[9px]">Search</span>
                                </button>
                                <button onClick={() => addManualDecoration('ui-notif')} className="aspect-square bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md hover:scale-105 transition-all flex flex-col items-center justify-center text-slate-500 gap-1">
                                    <Bell size={18} /> <span className="text-[9px]">Notif</span>
                                </button>
                                <button onClick={() => addManualDecoration('ui-toggle')} className="aspect-square bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md hover:scale-105 transition-all flex flex-col items-center justify-center text-slate-500 gap-1">
                                    <ToggleRight size={18} /> <span className="text-[9px]">Toggle</span>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase mb-3 block">Vector Backgrounds ({BG_PATTERNS.length})</label>
                            <div className="grid grid-cols-3 gap-3">
                                {BG_PATTERNS.map(p => (
                                    <button key={p.id} onClick={() => updateBranding({ bgOverlayType: p.id as any })} className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all hover:scale-[1.02] ${branding.bgOverlayType === p.id ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-slate-100 text-slate-400 hover:border-primary-200'}`}>
                                        {p.icon} <span className="text-[9px] font-bold">{p.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
               </div>
           )}

            {/* 5. LAYOUT (ENHANCED) */}
           {activeModule === 'layout' && (
               <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="p-6 border-b border-slate-50 bg-white sticky top-0 z-10">
                        <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                            <Layout size={18} className="text-primary-600"/> Smart Layouts
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">Optimize structure for data, stories, and engagement.</p>
                    </div>

                    <div className="p-6 space-y-8 overflow-y-auto">
                        {/* AI Auto Match */}
                        <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100 relative overflow-hidden group">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                             <div className="relative z-10">
                                 <h3 className="font-bold text-indigo-900 text-sm mb-1 flex items-center gap-2"><Sparkles size={14}/> AI Layout Matcher</h3>
                                 <p className="text-xs text-indigo-700/80 mb-4">Analyze your content and auto-select the highest converting structure.</p>
                                 <button 
                                    onClick={handleAutoLayout} 
                                    disabled={aiLoading}
                                    className="w-full py-2.5 bg-indigo-600 text-white rounded-lg text-xs font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                                >
                                    {aiLoading ? <Loader2 className="animate-spin" size={14}/> : <Wand2 size={14}/>}
                                    {aiLoading ? 'Analyzing...' : 'Auto-Match Layout'}
                                 </button>
                             </div>
                        </div>

                        {/* Scenarios */}
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase mb-3 block flex items-center gap-2">
                                <Target size={12}/> Real-World Scenarios
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: 'Data Reveal', layout: 'stat', icon: TrendingUp, desc: 'Highlight a big number' },
                                    { label: 'The "Hook"', layout: 'hook', icon: Zap, desc: 'Stop the scroll' },
                                    { label: 'Step-by-Step', layout: 'list', icon: ListOrdered, desc: 'Process breakdown' },
                                    { label: 'Social Proof', layout: 'quote', icon: MessageCircle, desc: 'Testimonial/Review' },
                                    { label: 'Comparison', layout: 'two-col', icon: SplitSquareHorizontal, desc: 'Side-by-side' },
                                    { label: 'Deep Dive', layout: 'center', icon: AlignCenter, desc: 'Focus on text' },
                                ].map((scenario) => (
                                    <button 
                                        key={scenario.label}
                                        onClick={() => {
                                            const n = [...slides];
                                            n[currentSlideIndex].layout = scenario.layout as SlideLayout;
                                            // Reset visuals for cleanliness
                                            if (scenario.layout === 'stat') { n[currentSlideIndex].showImage = false; n[currentSlideIndex].showSubtitle = true; }
                                            if (scenario.layout === 'hook') { n[currentSlideIndex].showBody = false; }
                                            updateSlides(n);
                                        }}
                                        className={`p-3 rounded-xl border text-left transition-all hover:scale-[1.02] ${activeSlide.layout === scenario.layout ? 'border-primary-500 bg-primary-50 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow'}`}
                                    >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${activeSlide.layout === scenario.layout ? 'bg-primary-100 text-primary-600' : 'bg-slate-50 text-slate-500'}`}>
                                            <scenario.icon size={16}/>
                                        </div>
                                        <div className="text-xs font-bold text-slate-900">{scenario.label}</div>
                                        <div className="text-[10px] text-slate-400 leading-tight mt-0.5">{scenario.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Layout Options */}
                        <div>
                             <label className="text-xs font-bold text-slate-400 uppercase mb-3 block flex items-center gap-2">
                                <Sliders size={12}/> Configuration
                            </label>
                            
                            <div className="bg-white border border-slate-200 rounded-xl p-1 flex gap-1 mb-3">
                                {['left', 'center', 'right'].map((align) => (
                                    <button 
                                        key={align}
                                        onClick={() => updateBranding({ textAlign: align as any })}
                                        className={`flex-1 py-2 rounded-lg flex items-center justify-center transition-all ${branding.textAlign === align ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-400 hover:bg-slate-50'}`}
                                    >
                                        {align === 'left' ? <AlignLeft size={16}/> : align === 'center' ? <AlignCenter size={16}/> : <AlignRight size={16}/>}
                                    </button>
                                ))}
                            </div>

                            {activeSlide.layout === 'list' && (
                                <div className="bg-white border border-slate-200 rounded-xl p-3">
                                     <div className="text-[10px] font-bold text-slate-500 uppercase mb-2">List Style</div>
                                     <div className="flex gap-2">
                                        {['numbers', 'dots', 'checks'].map((style) => (
                                            <button
                                                key={style}
                                                onClick={() => { const n = [...slides]; n[currentSlideIndex].layoutConfig = { ...n[currentSlideIndex].layoutConfig, bulletStyle: style as any }; updateSlides(n); }}
                                                className={`flex-1 py-2 text-xs font-bold rounded-lg border ${activeSlide.layoutConfig?.bulletStyle === style ? 'bg-primary-50 border-primary-200 text-primary-700' : 'bg-slate-50 border-transparent text-slate-500'}`}
                                            >
                                                {style === 'numbers' ? '1, 2, 3' : style === 'dots' ? '• Bullet' : '✓ Check'}
                                            </button>
                                        ))}
                                     </div>
                                </div>
                            )}
                        </div>
                    </div>
               </div>
           )}
           
           {/* 6. TEXT MODULE (SIMPLIFIED - AI REMOVED) */}
           {activeModule === 'text' && (
               <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
                   <div className="p-6 border-b border-slate-50 bg-white">
                       <h2 className="font-bold text-slate-900 text-lg mb-4">Typography</h2>
                   </div>
                   
                   <div className="p-6 space-y-6 overflow-y-auto">
                       {/* STYLE CONTROLS ONLY */}
                       <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                           <div>
                               <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Alignment</label>
                               <div className="flex p-1 bg-slate-100 rounded-lg">
                                   {['left', 'center', 'right'].map((align) => (
                                       <button 
                                          key={align} 
                                           onClick={() => updateBranding({ textAlign: align as any })}
                                           className={`flex-1 py-2 rounded-md flex items-center justify-center transition-all ${branding.textAlign === align ? 'bg-white shadow text-slate-900' : 'text-slate-400'}`}
                                       >
                                           {align === 'left' ? <AlignLeft size={16}/> : align === 'center' ? <AlignCenter size={16}/> : <AlignRight size={16}/>}
                                       </button>
                                   ))}
                               </div>
                           </div>

                           <div>
                                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Heading Font</label>
                                <select 
                                    value={branding.fontHeading} 
                                    onChange={(e) => updateBranding({ fontHeading: e.target.value, useCustomFonts: true })}
                                    className="w-full p-3 rounded-xl border border-slate-200 text-sm font-bold bg-white"
                                >
                                    {FONTS.map(f => <option key={f.value} value={f.value}>{f.name}</option>)}
                                </select>
                           </div>
                           
                           <div>
                                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Body Font</label>
                                <select 
                                    value={branding.fontBody} 
                                    onChange={(e) => updateBranding({ fontBody: e.target.value, useCustomFonts: true })}
                                    className="w-full p-3 rounded-xl border border-slate-200 text-sm font-bold bg-white"
                                >
                                    {FONTS.map(f => <option key={f.value} value={f.value}>{f.name}</option>)}
                                </select>
                           </div>

                           <div>
                               <div className="flex justify-between mb-2">
                                   <label className="text-xs font-bold text-slate-400 uppercase block">Scale</label>
                                   <span className="text-xs font-bold text-slate-900">{Math.round(branding.fontScale * 100)}%</span>
                               </div>
                               <input 
                                  type="range" min="0.5" max="1.5" step="0.1" 
                                  value={branding.fontScale}
                                  onChange={(e) => updateBranding({ fontScale: parseFloat(e.target.value) })}
                                  className="w-full accent-primary-600"
                               />
                           </div>
                           
                           <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200">
                               <span className="text-sm font-bold text-slate-700">Uppercase Headings</span>
                               <button 
                                  onClick={() => updateBranding({ uppercaseHeadings: !branding.uppercaseHeadings })}
                                  className={`w-10 h-6 rounded-full transition-colors flex items-center p-1 ${branding.uppercaseHeadings ? 'bg-primary-500 justify-end' : 'bg-slate-200 justify-start'}`}
                               >
                                   <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
                               </button>
                           </div>
                       </div>
                   </div>
               </div>
           )}

           {/* 7. COLORS MODULE (ENHANCED) */}
           {activeModule === 'colors' && (
               <div className="flex flex-col h-full p-6 space-y-6 overflow-y-auto">
                   <h2 className="font-bold text-slate-900 text-lg">Colors & Psychology</h2>
                   
                   {/* Psychology Section */}
                   <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 border border-indigo-100">
                        <div className="flex items-center gap-2 mb-3">
                            <Brain size={16} className="text-indigo-600"/>
                            <span className="text-xs font-bold text-indigo-900 uppercase">Color Psychology & Scenarios</span>
                        </div>
                        <div className="space-y-2">
                            {COLOR_SCENARIOS.map((scenario, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => updateBranding({ useCustomColors: true, backgroundColor: scenario.colors.bg, textColor: scenario.colors.text, accentColor: scenario.colors.accent })}
                                    className="w-full flex items-center justify-between p-2 bg-white/60 hover:bg-white rounded-lg border border-indigo-100/50 hover:border-indigo-200 transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-1.5 bg-indigo-100 rounded-lg text-indigo-600">
                                            <scenario.icon size={14} />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-xs font-bold text-slate-900">{scenario.title}</div>
                                            <div className="text-[10px] text-slate-500">{scenario.desc}</div>
                                        </div>
                                    </div>
                                    <div className="flex -space-x-1">
                                        <div className="w-3 h-3 rounded-full border border-white" style={{background: scenario.colors.bg}}></div>
                                        <div className="w-3 h-3 rounded-full border border-white" style={{background: scenario.colors.text}}></div>
                                        <div className="w-3 h-3 rounded-full border border-white" style={{background: scenario.colors.accent}}></div>
                                    </div>
                                </button>
                            ))}
                        </div>
                   </div>
                   
                   {/* ALTERNATE COLORS TOGGLE */}
                   <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                       <div className="flex items-center gap-2">
                           <Shuffle size={16} className="text-slate-500"/>
                           <span className="text-sm font-bold text-slate-700">Alternate Colors</span>
                       </div>
                       <button 
                          onClick={() => updateBranding({ alternateColors: !branding.alternateColors })}
                          className={`w-10 h-6 rounded-full transition-colors flex items-center p-1 ${branding.alternateColors ? 'bg-primary-500 justify-end' : 'bg-slate-200 justify-start'}`}
                       >
                           <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
                       </button>
                   </div>
                   <div className="text-[10px] text-slate-400 -mt-4 pl-1">Swaps text and background colors on every other slide.</div>

                   <div className="space-y-4">
                       <label className="text-xs font-bold text-slate-400 uppercase block">Curated Palettes</label>
                       
                       {/* Group palettes by category */}
                       {Array.from(new Set(CURATED_PALETTES.map(p => p.category))).map(cat => (
                           <div key={cat} className="mb-4">
                               <div className="text-[10px] font-bold text-slate-400 mb-2 pl-1">{cat}</div>
                               <div className="grid grid-cols-2 gap-3">
                                   {CURATED_PALETTES.filter(p => p.category === cat).map((pal, idx) => (
                                       <button 
                                          key={idx}
                                          onClick={() => updateBranding({ useCustomColors: true, backgroundColor: pal.bg, textColor: pal.text, accentColor: pal.accent })}
                                          className="flex items-center gap-2 p-2 rounded-xl border border-slate-100 hover:border-primary-200 hover:bg-slate-50 transition-all text-left group"
                                       >
                                           <div className="w-8 h-8 rounded-full border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                                               <div className="w-1/3 h-full" style={{background: pal.bg}}></div>
                                               <div className="w-1/3 h-full" style={{background: pal.text}}></div>
                                               <div className="w-1/3 h-full" style={{background: pal.accent}}></div>
                                           </div>
                                           <div>
                                               <div className="text-xs font-bold text-slate-900 leading-tight">{pal.name}</div>
                                           </div>
                                       </button>
                                   ))}
                               </div>
                           </div>
                       ))}
                   </div>

                   <div className="space-y-4 pt-4 border-t border-slate-100">
                       <label className="text-xs font-bold text-slate-400 uppercase block">Custom Colors</label>
                       
                       <div className="flex items-center justify-between p-2 rounded-xl border border-slate-100">
                           <span className="text-sm font-bold text-slate-700 ml-2">Background</span>
                           <div className="flex items-center gap-2">
                               <input type="text" value={branding.backgroundColor} onChange={(e) => updateBranding({ useCustomColors: true, backgroundColor: e.target.value })} className="w-20 text-xs font-mono p-1 border rounded" />
                               <input type="color" value={branding.backgroundColor} onChange={(e) => updateBranding({ useCustomColors: true, backgroundColor: e.target.value })} className="w-8 h-8 rounded cursor-pointer border-none bg-transparent" />
                           </div>
                       </div>
                       
                       <div className="flex items-center justify-between p-2 rounded-xl border border-slate-100">
                           <span className="text-sm font-bold text-slate-700 ml-2">Text</span>
                           <div className="flex items-center gap-2">
                               <input type="text" value={branding.textColor} onChange={(e) => updateBranding({ useCustomColors: true, textColor: e.target.value })} className="w-20 text-xs font-mono p-1 border rounded" />
                               <input type="color" value={branding.textColor} onChange={(e) => updateBranding({ useCustomColors: true, textColor: e.target.value })} className="w-8 h-8 rounded cursor-pointer border-none bg-transparent" />
                           </div>
                       </div>
                       
                       <div className="flex items-center justify-between p-2 rounded-xl border border-slate-100">
                           <span className="text-sm font-bold text-slate-700 ml-2">Accent</span>
                           <div className="flex items-center gap-2">
                               <input type="text" value={branding.accentColor} onChange={(e) => updateBranding({ useCustomColors: true, accentColor: e.target.value })} className="w-20 text-xs font-mono p-1 border rounded" />
                               <input type="color" value={branding.accentColor} onChange={(e) => updateBranding({ useCustomColors: true, accentColor: e.target.value })} className="w-8 h-8 rounded cursor-pointer border-none bg-transparent" />
                           </div>
                       </div>
                   </div>
               </div>
           )}

           {/* 8. BRAND KIT */}
           {activeModule === 'branding' && (
              <div className="flex flex-col h-full p-6 space-y-6 overflow-y-auto">
                 <h2 className="font-bold text-slate-900 text-lg mb-2">Brand Identity</h2>
                 
                 {/* Themes */}
                 <div>
                     <label className="text-xs font-bold text-slate-400 uppercase mb-3 block">Base Themes</label>
                     <div className="grid grid-cols-1 gap-3">
                        {FUTURISTIC_THEMES.map(t => (
                            <div key={t.id} onClick={() => updateBranding({ activeThemeId: t.id, useCustomColors: false, bgOverlayType: t.overlayType, bgShapeStyle: t.shapeStyle })} className={`relative h-20 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${branding.activeThemeId === t.id && !branding.useCustomColors ? 'border-primary-500 ring-2 ring-primary-100' : 'border-transparent'}`}>
                                 <div className="absolute inset-0" style={{background: t.bg}}></div>
                                 <div className="absolute inset-0 p-4 font-bold text-white drop-shadow-md flex items-center">{t.name}</div>
                            </div>
                        ))}
                     </div>
                 </div>

                 <div className="pt-6 border-t border-slate-100 space-y-4">
                     <label className="text-xs font-bold text-slate-400 uppercase block">Personal Brand</label>
                     <div className="space-y-3">
                         <div className="flex items-center gap-2">
                             <div onClick={() => avatarInputRef.current?.click()} className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 cursor-pointer overflow-hidden hover:opacity-80">
                                 {branding.personalAvatar ? <img src={branding.personalAvatar} className="w-full h-full object-cover"/> : <UserCircle2 className="w-full h-full p-2 text-slate-400"/>}
                             </div>
                             <div className="flex-1">
                                 <input type="text" value={branding.personalName} onChange={(e) => updateBranding({ personalName: e.target.value })} placeholder="Your Name" className="w-full text-sm font-bold border-b border-slate-200 focus:border-primary-500 outline-none pb-1 bg-transparent"/>
                                 <input type="text" value={branding.personalHandle} onChange={(e) => updateBranding({ personalHandle: e.target.value })} placeholder="@handle" className="w-full text-xs text-slate-500 border-b border-slate-200 focus:border-primary-500 outline-none pb-1 bg-transparent mt-1"/>
                             </div>
                         </div>
                         <div className="flex gap-2">
                             <button onClick={() => updateBranding({ showPersonalName: !branding.showPersonalName })} className={`flex-1 py-2 text-[10px] font-bold rounded border ${branding.showPersonalName ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-200'}`}>Name</button>
                             <button onClick={() => updateBranding({ showPersonalHandle: !branding.showPersonalHandle })} className={`flex-1 py-2 text-[10px] font-bold rounded border ${branding.showPersonalHandle ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-200'}`}>Handle</button>
                             <button onClick={() => updateBranding({ showPersonalAvatar: !branding.showPersonalAvatar })} className={`flex-1 py-2 text-[10px] font-bold rounded border ${branding.showPersonalAvatar ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-200'}`}>Avatar</button>
                         </div>
                     </div>
                 </div>

                 <div className="pt-6 border-t border-slate-100 space-y-4">
                     <label className="text-xs font-bold text-slate-400 uppercase block">Company Brand</label>
                     <div className="flex items-center gap-2">
                         <div onClick={() => logoInputRef.current?.click()} className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 cursor-pointer overflow-hidden hover:opacity-80 flex items-center justify-center">
                             {branding.companyLogo ? <img src={branding.companyLogo} className="w-full h-full object-contain"/> : <Building2 className="p-2 text-slate-400"/>}
                         </div>
                         <div className="flex-1">
                              <button onClick={() => updateBranding({ showCompanyLogo: !branding.showCompanyLogo })} className={`w-full py-2 text-xs font-bold rounded border ${branding.showCompanyLogo ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-200'}`}>Show Logo on Slides</button>
                         </div>
                     </div>
                 </div>
              </div>
           )}

           {/* 9. SWIPE MODULE */}
           {activeModule === 'swipe' && (
               <div className="flex flex-col h-full p-6 space-y-6 overflow-y-auto">
                   <h2 className="font-bold text-slate-900 text-lg">Swipe Call-to-Action</h2>
                   
                   <div>
                       <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Arrow Style</label>
                       <div className="grid grid-cols-4 gap-2">
                           {Object.keys(ARROW_ICONS).map((style) => {
                               const Icon = ARROW_ICONS[style];
                               return (
                                   <button 
                                      key={style}
                                      onClick={() => updateBranding({ arrowStyle: style as any })}
                                      className={`aspect-square rounded-xl border flex items-center justify-center hover:bg-slate-50 transition-all ${branding.arrowStyle === style ? 'border-primary-500 bg-primary-50 text-primary-600' : 'border-slate-200 text-slate-400'}`}
                                   >
                                       <Icon size={20} />
                                   </button>
                               )
                           })}
                       </div>
                   </div>

                   <div>
                       <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Swipe Text (Intro)</label>
                       <div className="flex gap-2">
                           <input 
                              type="text" 
                              value={branding.introArrowText} 
                              onChange={(e) => updateBranding({ introArrowText: e.target.value })}
                              className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-primary-500"
                           />
                           <button onClick={() => updateBranding({ introArrowEnabled: !branding.introArrowEnabled })} className={`px-4 rounded-xl border font-bold text-xs ${branding.introArrowEnabled ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-200'}`}>
                               {branding.introArrowEnabled ? 'ON' : 'OFF'}
                           </button>
                       </div>
                   </div>

                   <div>
                       <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Page Counter</label>
                       <button onClick={() => updateBranding({ showCounter: !branding.showCounter })} className={`w-full py-3 rounded-xl border font-bold text-sm transition-all ${branding.showCounter ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-200'}`}>
                           {branding.showCounter ? 'Show Page Numbers' : 'Hide Page Numbers'}
                       </button>
                   </div>
               </div>
           )}

           {/* 10. ORDER MODULE */}
           {activeModule === 'order' && (
               <div className="flex flex-col h-full p-6 space-y-4 overflow-y-auto">
                   <h2 className="font-bold text-slate-900 text-lg mb-2">Reorder Slides</h2>
                   <div className="space-y-2">
                       {slides.map((slide, index) => (
                           <div key={slide.id} onClick={() => setCurrentSlideIndex(index)} className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${currentSlideIndex === index ? 'border-primary-500 bg-primary-50' : 'border-slate-200 bg-white hover:border-primary-200'}`}>
                               <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold">{index + 1}</div>
                               <div className="flex-1 truncate font-bold text-sm text-slate-700">{slide.title || 'Untitled'}</div>
                               <div className="flex flex-col gap-1">
                                   <button onClick={(e) => { e.stopPropagation(); moveSlide('up'); }} disabled={index === 0} className="p-1 hover:bg-white rounded text-slate-400 hover:text-primary-600 disabled:opacity-20"><ArrowUpNarrowWide size={12}/></button>
                                   <button onClick={(e) => { e.stopPropagation(); moveSlide('down'); }} disabled={index === slides.length-1} className="p-1 hover:bg-white rounded text-slate-400 hover:text-primary-600 disabled:opacity-20 transform rotate-180"><ArrowUpNarrowWide size={12}/></button>
                               </div>
                               <button onClick={(e) => { e.stopPropagation(); deleteSlide(); }} className="p-2 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded transition-colors"><Trash2 size={14}/></button>
                           </div>
                       ))}
                   </div>
               </div>
           )}

           {/* Default fallback */}
           {!['import', 'projects', 'content', 'background', 'layout', 'branding', 'text', 'colors', 'swipe', 'order'].includes(activeModule) && (
               <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center">
                   <Settings size={32} className="mb-4 opacity-20"/>
                   <p className="text-sm">Select a module from the sidebar</p>
               </div>
           )}
        </div>

        {/* CANVAS WORKSPACE */}
        <div className="flex-1 bg-slate-200 relative flex flex-col overflow-hidden">
           {/* Canvas Controls */}
           <div className="h-12 bg-white/80 backdrop-blur border-b border-slate-200 flex items-center justify-between px-6 z-10 shrink-0">
               <div className="flex items-center gap-3">
                   <button onClick={() => setViewport(v => ({...v, scale: Math.max(0.1, v.scale - 0.1)}))} className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><ZoomOut size={16}/></button>
                   <span className="text-xs font-bold text-slate-600 w-8 text-center">{Math.round(viewport.scale * 100)}%</span>
                   <button onClick={() => setViewport(v => ({...v, scale: Math.min(3, v.scale + 0.1)}))} className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><ZoomIn size={16}/></button>
               </div>
               <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                   <span className="flex items-center gap-1"><Hand size={12}/> Space + Drag</span>
               </div>
           </div>

           {/* Canvas Viewport */}
           <div 
               ref={canvasContainerRef}
               className={`flex-1 overflow-hidden relative ${isPanning ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
               onWheel={handleWheel}
               onMouseDown={handleCanvasMouseDown}
               onMouseMove={handleMouseMove}
               onMouseUp={handleMouseUp}
               onMouseLeave={handleMouseUp}
           >
               <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: `${20 * viewport.scale}px ${20 * viewport.scale}px`, backgroundPosition: `${viewport.offsetX}px ${viewport.offsetY}px` }} />
               
               <div style={{ transform: `translate(${viewport.offsetX}px, ${viewport.offsetY}px) scale(${viewport.scale})`, transformOrigin: '0 0', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <div 
                      className="relative shadow-2xl overflow-hidden flex flex-col transition-shadow duration-300 ring-1 ring-slate-900/5 bg-white"
                      style={{ width: `${baseW}px`, height: `${baseH}px`, background: effectiveBg, color: effectiveText, fontFamily: effectiveFontBody }}
                   >
                      {/* LAYERS */}
                      <div className="absolute inset-0 pointer-events-none z-0" style={patternStyle}>
                          
                      </div>

                      {/* DECORATIONS */}
                      {(activeSlide.decorations || []).map((deco) => (
                          <div 
                             key={deco.id}
                             onMouseDown={(e) => handleDecorationMouseDown(e, deco.id, !!deco.locked)}
                             className={`absolute group ${selectedDecorationId === deco.id ? 'z-50 cursor-move' : 'z-0'} ${deco.locked ? 'cursor-not-allowed' : 'cursor-pointer hover:opacity-100'}`}
                             style={{
                                 top: `${deco.position.top}%`, left: `${deco.position.left}%`,
                                 width: deco.type === 'orb' ? `${deco.position.width}%` : `${deco.position.width}px`,
                                 height: deco.type === 'orb' ? `${deco.position.height}%` : `${deco.position.height}px`,
                                 transform: `translate(-50%, -50%) rotate(${deco.position.rotation}deg)`,
                                 opacity: deco.opacity
                             }}
                          >
                             {selectedDecorationId === deco.id && (
                                 <div className="absolute -inset-2 border-2 border-primary-500 rounded-lg pointer-events-none z-50">
                                     <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1 pointer-events-auto bg-white rounded-lg shadow-xl p-1">
                                         <button onClick={(e) => { e.stopPropagation(); const n=[...slides]; const d=n[currentSlideIndex].decorations?.find(x=>x.id===deco.id); if(d) d.locked=!d.locked; updateSlides(n); }} className="p-1 hover:bg-slate-100 rounded text-slate-500">{deco.locked ? <Lock size={12}/> : <Unlock size={12}/>}</button>
                                         <button onClick={(e) => { e.stopPropagation(); const n=[...slides]; n[currentSlideIndex].decorations=n[currentSlideIndex].decorations?.filter(x=>x.id!==deco.id); updateSlides(n); }} className="p-1 hover:bg-red-50 text-red-500 rounded"><Trash2 size={12}/></button>
                                     </div>
                                 </div>
                             )}
                             {deco.type === 'orb' && <div className="w-full h-full rounded-full" style={{background: deco.style.color, filter: `blur(${deco.style.blur}px)`}} />}
                             {(deco.type === 'shape' || deco.type === 'ui') && (
                                 <div 
                                     className={`w-full h-full flex items-center justify-center 
                                        ${deco.style.shape==='circle'?'rounded-full':
                                          deco.style.shape==='pill'?'rounded-full':
                                          deco.style.shape==='blob'?'rounded-[40%_60%_70%_30%/40%_50%_60%_50%]':
                                          deco.style.shape==='button'?'rounded-lg shadow-md':
                                          deco.style.shape==='search'?'rounded-full border border-slate-200 shadow-sm bg-white':
                                          deco.style.shape==='toggle'?'rounded-full shadow-inner bg-slate-200':
                                          deco.style.shape==='notification'?'rounded-full shadow-lg bg-red-500':
                                          'rounded-lg'}`
                                     } 
                                     style={{
                                         background: deco.style.shape === 'search' ? '#fff' : deco.style.color, 
                                         border: deco.style.border ? `${deco.style.borderWidth}px solid ${deco.style.borderColor}` : 'none',
                                         borderRadius: (deco.style.shape && deco.style.shape !== 'rect') ? undefined : `${deco.style.borderRadius}px`
                                     }} 
                                 >
                                    {deco.style.shape === 'search' && <div className="flex items-center w-full px-2 gap-1 text-slate-400"><Search size="40%"/> <div className="h-1 w-1/2 bg-slate-200 rounded"></div></div>}
                                    {deco.style.shape === 'button' && <div className="text-[8px] font-bold text-white uppercase tracking-wider">Button</div>}
                                    {deco.style.shape === 'toggle' && <div className="w-[40%] h-[80%] bg-white rounded-full shadow-sm ml-auto mr-1"></div>}
                                    {deco.style.shape === 'notification' && <div className="text-[6px] font-bold text-white">1</div>}
                                 </div>
                             )}
                             {deco.type === 'chart' && (
                                 <div className="w-full h-full flex items-center justify-center" style={{color: deco.style.color}}>
                                     {deco.style.shape === 'pie' && <PieChart size="100%" strokeWidth={1.5} />}
                                     {deco.style.shape === 'bar' && <BarChart3 size="100%" strokeWidth={1.5} />}
                                     {deco.style.shape === 'line' && <LineChart size="100%" strokeWidth={1.5} />}
                                 </div>
                             )}
                             {deco.type === 'icon' && deco.style.icon && <deco.style.icon size="100%" color={deco.style.color} />}
                          </div>
                      ))}

                      {/* CONTENT RENDERING */}
                      <div className="relative z-10 flex-1 p-[8%] flex flex-col h-full pointer-events-none" style={{textAlign: activeSlide.layoutConfig?.textAlign || branding.textAlign}}>
                          {activeSlide.layout === 'hook' && (
                            <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6">
                                {(activeSlide.imagePosition === 'top') && renderSlideImage()}
                                {activeSlide.showSubtitle && <div className="text-sm font-bold tracking-[0.2em] uppercase opacity-80" style={{color: effectiveAccentSecondary}}>{activeSlide.subtitle}</div>}
                                {(activeSlide.imagePosition === 'middle' || !activeSlide.imagePosition) && renderSlideImage()}
                                <h1 className="font-extrabold leading-tight" style={{fontFamily: effectiveFontHeading, fontSize: `${3.5 * branding.fontScale}rem`, textTransform: branding.uppercaseHeadings ? 'uppercase' : 'none'}}>{activeSlide.title}</h1>
                                {(activeSlide.imagePosition === 'bottom') && renderSlideImage()}
                                <div className="w-24 h-1.5 rounded-full mt-4" style={{background: `linear-gradient(90deg, ${effectiveAccentPrimary}, ${effectiveAccentSecondary})`}}></div>
                            </div>
                          )}

                          {activeSlide.layout === 'list' && (
                              <div className="flex-1 flex flex-col">
                                {(activeSlide.imagePosition === 'top') && renderSlideImage()}
                                {activeSlide.showTitle && <h2 className="font-bold mb-8 leading-tight" style={{fontFamily: effectiveFontHeading, fontSize: `${2.2 * branding.fontScale}rem`, textTransform: branding.uppercaseHeadings ? 'uppercase' : 'none'}}>{activeSlide.title}</h2>}
                                {(activeSlide.imagePosition === 'middle' || !activeSlide.imagePosition) && renderSlideImage()}
                                <div className="space-y-4 flex-1">
                                    {activeSlide.body.split(/<br\/>|\n/).filter(line => line.trim() !== '').map((point, idx) => (
                                        <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 text-sm" style={{background: effectiveAccentPrimary, color: '#fff'}}>{idx + 1}</div>
                                            <div className="font-medium leading-snug" style={{fontSize: `${1.2 * branding.fontScale}rem`}} dangerouslySetInnerHTML={{__html: point.replace(/^\d+\.\s*/, '')}}></div>
                                        </div>
                                    ))}
                                </div>
                                {(activeSlide.imagePosition === 'bottom') && renderSlideImage()}
                              </div>
                          )}

                          {['two-col','image-left','center','cta','stat','quote'].includes(activeSlide.layout) && (
                              <div className={`flex-1 flex flex-col ${activeSlide.layout==='center'||activeSlide.layout==='cta'||activeSlide.layout==='stat'?'justify-center items-center':''} gap-6`}>
                                   {(activeSlide.imagePosition === 'top') && renderSlideImage()}
                                   
                                   {activeSlide.layout === 'stat' && <div className="font-black leading-none tracking-tighter mb-4" style={{fontFamily: effectiveFontHeading, color: effectiveAccentPrimary, fontSize: `${8 * branding.fontScale}rem`, textTransform: branding.uppercaseHeadings ? 'uppercase' : 'none'}}>{activeSlide.title}</div>}
                                   {activeSlide.layout !== 'stat' && activeSlide.showTitle && <h2 className="font-bold leading-tight" style={{fontFamily: effectiveFontHeading, fontSize: `${2.5 * branding.fontScale}rem`, textTransform: branding.uppercaseHeadings ? 'uppercase' : 'none'}}>{activeSlide.title}</h2>}
                                   
                                   {(activeSlide.imagePosition === 'middle' || !activeSlide.imagePosition) && renderSlideImage()}
                                   
                                   {activeSlide.showBody && <div className="opacity-90 leading-relaxed" style={{fontSize: `${1.2 * branding.fontScale}rem`}} dangerouslySetInnerHTML={{__html: activeSlide.body}}></div>}
                                   {activeSlide.showCta && activeSlide.cta && <div className="px-8 py-4 rounded-full font-bold text-xl shadow-lg mt-4" style={{background: effectiveAccentPrimary, color: '#fff'}}>{activeSlide.cta}</div>}
                                   
                                   {(activeSlide.imagePosition === 'bottom') && renderSlideImage()}
                              </div>
                          )}

                          {/* Footer */}
                          <div className="pt-6 mt-auto flex items-center justify-between border-t border-white/10 relative z-20">
                                <div className="flex items-center gap-3">
                                    {branding.showPersonalAvatar && branding.personalAvatar && <img src={branding.personalAvatar} className="w-10 h-10 rounded-full border-2" style={{borderColor: effectiveAccentPrimary}} />}
                                    <div className="flex flex-col">
                                        {branding.showPersonalName && <span className="text-[10px] font-bold opacity-60 leading-tight">{branding.personalName}</span>}
                                        {branding.showPersonalHandle && <span className="text-xs font-bold leading-tight">{branding.personalHandle}</span>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                     {branding.introArrowEnabled && (
                                         <div className="flex items-center gap-1 opacity-80 text-xs font-bold uppercase tracking-wider">
                                              <span>{branding.introArrowText}</span>
                                              {(() => { const Arrow = ARROW_ICONS[branding.arrowStyle] || ArrowRight; return <Arrow size={14} />; })()}
                                         </div>
                                     )}
                                     {branding.showCounter && <div className="px-3 py-1 rounded-full bg-black/10 text-xs font-bold backdrop-blur-md">{currentSlideIndex + 1} / {slides.length}</div>}
                                </div>
                          </div>
                          
                          {/* Company Logo Overlay */}
                          {branding.showCompanyLogo && branding.companyLogo && (
                              <div className="absolute top-6 right-6 w-12 h-12 contain-content opacity-80 mix-blend-screen">
                                  <img src={branding.companyLogo} className="w-full h-full object-contain" />
                              </div>
                          )}
                      </div>
                   </div>
               </div>
           </div>

           {/* Timeline */}
           <div className="h-24 bg-white border-t border-slate-200 flex items-center gap-3 overflow-x-auto px-6 hide-scrollbar z-20 shrink-0">
                 {slides.map((s, i) => {
                     // Determine preview colors for timeline
                     let prevBg = effectiveBg;
                     let prevText = effectiveText;
                     const isPrevAlt = branding.alternateColors && ((i + 1) % 2 === 0);
                     if (isPrevAlt) {
                         const baseBg = branding.useCustomColors ? branding.backgroundColor : activeTheme.bg;
                         const baseText = branding.useCustomColors ? branding.textColor : activeTheme.text;
                         prevBg = baseText;
                         prevText = baseBg;
                     } else if (!branding.alternateColors) {
                         const baseBg = branding.useCustomColors ? branding.backgroundColor : activeTheme.bg;
                         const baseText = branding.useCustomColors ? branding.textColor : activeTheme.text;
                         prevBg = baseBg;
                         prevText = baseText;
                     }

                     return (
                       <button key={s.id} onClick={() => setCurrentSlideIndex(i)} className={`w-14 h-16 rounded-lg border-2 flex-shrink-0 relative group transition-all transform hover:-translate-y-1 ${i===currentSlideIndex ? 'border-primary-500 shadow-md scale-105' : 'border-slate-100 grayscale opacity-70 hover:opacity-100'}`} style={{background: prevBg}}>
                          <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold opacity-50 overflow-hidden text-center p-1 leading-none" style={{color: prevText}}>{s.title}</div>
                          <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center text-[8px] font-bold">{i+1}</div>
                       </button>
                     )
                 })}
                 <button onClick={() => updateSlides([...slides, createInitialSlide(Date.now())])} className="w-14 h-16 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-all"><Plus size={20}/></button>
           </div>
        </div>
      </div>

      {/* NEW PROJECT DIALOG */}
      {showNewProjectDialog && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in zoom-in-95 duration-200 text-center">
               <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4"><FilePlus size={24}/></div>
               <h3 className="text-xl font-bold text-slate-900 mb-2">Create New Carousel?</h3>
               <p className="text-slate-600 mb-6 text-sm">You have unsaved changes. Do you want to save them before starting a new project?</p>
               <div className="flex flex-col gap-3">
                  <button onClick={() => { saveCurrentWork(); resetEditor(); setShowNewProjectDialog(false); }} className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800">Save & Create New</button>
                  <button onClick={() => { resetEditor(); setShowNewProjectDialog(false); }} className="w-full py-3 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-100">Discard Changes</button>
                  <button onClick={() => setShowNewProjectDialog(false)} className="w-full py-2 text-slate-400 font-bold text-sm hover:text-slate-600">Cancel</button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};
