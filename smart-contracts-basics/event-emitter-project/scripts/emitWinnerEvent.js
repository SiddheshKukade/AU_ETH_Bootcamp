async function main() {
    const EMIT_WINNER_EVENT_CONTRACTj =
        "0x8272b09F90a55983cceC1954C1bC171A09243C25";
    const TARGET_CONTRACT = "0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502";
    const contract = await ethers.getContractAt(
        "EmitWinnerEvent",
        EMIT_WINNER_EVENT_CONTRACTj
    );

    const tx = await contract.emitWinnerEvent(TARGET_CONTRACT);
    await tx.wait();
    console.log("Winner event emitted");
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
