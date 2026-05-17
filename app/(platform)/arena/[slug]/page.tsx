"use client";

import { useEffect } from "react";
import ChallengeLayout from "@/components/arena/ChallengeLayout";
import ProblemPanel from "@/components/arena/ProblemPanel";
import EditorPanel from "@/components/arena/EditorPanel";
import TestCasePanel from "@/components/arena/TestCasePanel";
import ConsolePanel from "@/components/arena/ConsolePanel";
import { useArenaStore } from "@/store/arenaStore";
import { Problem } from "@/types/arena";

// Mock Problem Data for Dev
const MOCK_PROBLEM: Problem = {
  id: "prob_1",
  slug: "two-sum",
  title: "1. Two Sum",
  difficulty: "Bronze",
  baseVictoPoints: 50,
  timeLimit: 2000,
  memoryLimit: 256000,
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]`,
  testCases: [
    { id: "tc_1", input: "nums = [2,7,11,15]\\ntarget = 9", expectedOutput: "[0,1]", isHidden: false },
    { id: "tc_2", input: "nums = [3,2,4]\\ntarget = 6", expectedOutput: "[1,2]", isHidden: false },
    { id: "tc_3", input: "nums = [3,3]\\ntarget = 6", expectedOutput: "[0,1]", isHidden: false },
    { id: "tc_hidden", input: "[Hidden]", expectedOutput: "[Hidden]", isHidden: true },
  ],
  initialCode: {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Initiate combat sequence
};`,
    python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Initiate combat sequence
        pass`,
    cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Initiate combat sequence
    }
};`,
    java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Initiate combat sequence
    }
}`
  }
};

export default function ArenaChallengePage() {
  const setProblem = useArenaStore((state) => state.setProblem);
  const resetState = useArenaStore((state) => state.resetState);

  useEffect(() => {
    // On mount, load the mock problem
    setProblem(MOCK_PROBLEM);

    return () => {
      resetState();
    };
  }, [setProblem, resetState]);

  return (
    <ChallengeLayout 
      problemPanel={<ProblemPanel />}
      editorPanel={<EditorPanel />}
      testCasePanel={<TestCasePanel />}
      consolePanel={<ConsolePanel />}
    />
  );
}
