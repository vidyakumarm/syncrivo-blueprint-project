/**
 * 8D Logo Technology - Dimensional Shape System
 * 
 * This system creates perceived depth through illusion, not 3D transforms.
 * Each shape represents a dimensional state with specific visual techniques.
 * 
 * viewBox: 0 0 110 60
 */

export type ShapeKey = 'infinity' | 'verticalEight' | 'perspectiveInfinity' | 'converged';

/**
 * Dimensional Shape States
 * Each shape uses specific techniques to create depth perception:
 * - Stroke thickness modulation
 * - Asymmetric control points (perspective warp)
 * - Curve tightening/relaxation
 */
export const shapePaths: Record<ShapeKey, string> = {
    // 1D: Clean Infinity - Universal Layer
    // Uniform stroke, symmetric curves, flat perception
    infinity: "M30,30 C30,20 35,16 42,20 C46,23 50,26 55,30 C60,34 64,37 68,40 C72,43 77,44 80,40 C83,36 83,30 80,26 C77,22 72,21 68,24 C64,27 60,30 55,34 C50,38 46,41 42,44 C35,48 30,44 30,34 C30,32 30,31 30,30 Z",

    // 2D: Vertical Eight - Enterprise Structure
    // Flat vertical alignment, structured perception
    verticalEight: "M55,18 C50,18 46,20 44,24 C42,28 43,32 46,34 C49,36 53,36 57,34 C60,32 62,28 62,24 C62,20 59,18 55,18 M55,36 C50,36 46,38 44,42 C42,46 43,50 46,52 C49,54 53,54 57,52 C60,50 62,46 62,42 C62,38 59,36 55,36 Z",

    // 2.5D: Perspective Infinity - Depth & Orchestration
    // Asymmetric control points create tilt, one loop appears "closer"
    // Micro-warp (±4%) on right loop for depth illusion
    perspectiveInfinity: "M28,31 C28,21 33,15 40,19 C44,22 48,25 53,29 C58,33 63,37 68,41 C73,45 79,47 83,42 C87,37 88,30 84,24 C80,18 73,17 68,21 C63,25 58,29 53,34 C48,39 44,43 40,46 C33,51 28,46 28,35 C28,33 28,32 28,31 Z",

    // Converged Loop - Unified Messaging Layer
    // Compressed curves, tighter center, unified perception
    converged: "M55,30 C55,24 58,20 62,18 C66,16 70,18 72,22 C74,26 74,32 72,36 C70,40 66,42 62,40 C58,38 55,34 55,30 C51,34 48,38 44,40 C40,42 36,40 34,36 C32,32 32,26 34,22 C36,18 40,16 44,18 C48,20 51,24 55,30 Z"
};

/**
 * Stroke Thickness Mapping (Depth Illusion Technique #1)
 * Creates "closer/farther" perception through stroke variation
 * Range: ±8% from base (3px)
 */
export const strokeWidths: Record<ShapeKey, number> = {
    infinity: 3.0,              // 1D: Base thickness
    verticalEight: 2.8,         // 2D: Slightly thinner (-7%)
    perspectiveInfinity: 3.2,   // 2.5D: Thicker for depth (+7%)
    converged: 3.5              // Converged: Thickest (+17%, compression)
};

/**
 * 8D Auto-Loop Sequence
 * Demonstrates dimensional evolution: 1D → 2D → 2.5D → Converged → 1D
 */
export const dimensionalSequence: ShapeKey[] = [
    'infinity',             // 1D: Stable universal state
    'verticalEight',        // 2D: Enterprise alignment
    'perspectiveInfinity',  // 2.5D: Depth & orchestration
    'converged',            // Converged: Unified sync
    'infinity'              // Return to stable
];

/**
 * Context-Aware Shape Selection
 * Priority-based system for intelligent dimensional response
 */
export const getShapeByContext = (context: {
    forceShape?: ShapeKey;
    isNavHovered?: boolean;
    scrollProgress?: number;
    isCtaHovered?: boolean;
}): ShapeKey => {
    const { forceShape, isNavHovered, scrollProgress = 0, isCtaHovered } = context;

    // Highest priority: forced shape (external control)
    if (forceShape) return forceShape;

    // High priority: CTA hover - show convergence (unified layer)
    if (isCtaHovered) return 'converged';

    // Medium-high priority: Nav hover - show depth/orchestration
    if (isNavHovered) return 'perspectiveInfinity';

    // Medium priority: Scroll depth - show enterprise structure
    if (scrollProgress > 0.3) return 'verticalEight';

    // Default: Universal continuity
    return 'infinity';
};

/**
 * Dimensional State Meanings
 * Brand messaging aligned with dimensional concept
 */
export const dimensionalMessages: Record<ShapeKey, string> = {
    infinity: '1D: Universal connectivity - the foundation layer',
    verticalEight: '2D: Enterprise structure - organized alignment',
    perspectiveInfinity: '2.5D: Intelligent orchestration - depth perception',
    converged: 'Converged: Unified messaging - complete synchronization'
};
