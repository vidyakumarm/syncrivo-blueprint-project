import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HeroLoopAnimation } from '@/components/sections/HeroLoopAnimation';
import { vi } from 'vitest';

describe('HeroLoopAnimation', () => {
    const originalMatchMedia = window.matchMedia;

    afterEach(() => {
        // Restore original matchMedia after each test
        window.matchMedia = originalMatchMedia;
    });

    test('renders animated hub when reduced motion is not preferred', async () => {
        // Mock matchMedia to return false for reduced motion
        window.matchMedia = vi.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(), // deprecated
            removeListener: vi.fn(), // deprecated
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));

        render(<HeroLoopAnimation isVisible={true} />);
        // The animated hub container should be present (class contains "relative w-[340px]")
        const hubContainer = await screen.findByRole('region', { hidden: true });
        expect(hubContainer).toBeInTheDocument();
    });

    test('renders static placeholder when reduced motion is preferred', async () => {
        // Mock matchMedia to return true for reduced motion
        window.matchMedia = vi.fn().mockImplementation((query) => ({
            matches: true,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));

        render(<HeroLoopAnimation isVisible={true} />);
        // The placeholder hub has a background primary class
        const placeholder = await screen.findByRole('region', { hidden: true });
        expect(placeholder).toBeInTheDocument();
        // It should contain the Lock icon (svg) which has aria-hidden attribute by default
        const lockIcon = placeholder.querySelector('svg');
        expect(lockIcon).toBeInTheDocument();
    });
});
