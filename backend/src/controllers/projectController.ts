// backend/src/controllers/projectController.ts
import { Request, Response } from 'express';
export const getProjects = (req: Request, res: Response) => res.json({ projects: [] });
export const getProject = (req: Request, res: Response) => res.json({ project: {} });
export const createProject = (req: Request, res: Response) => res.status(201).json({ ok: true });
export const updateProject = (req: Request, res: Response) => res.json({ ok: true });
export const deleteProject = (req: Request, res: Response) => res.json({ ok: true });
export const updateProjectStatus = (req: Request, res: Response) => res.json({ ok: true });
export const getProjectProposals = (req: Request, res: Response) => res.json({ proposals: [] });
export const submitProposal = (req: Request, res: Response) => res.status(201).json({ ok: true });
export const updateProposal = (req: Request, res: Response) => res.json({ ok: true });


