

{ usermovement.length === 0 ? <h2>Não há registro de entrada ou saída</h2>:<ul>
            {
                usermovement.map((movement) => <ListItemContainer>{
                
                <>  
                
                    <div>
                    <span>{movement.data}</span>
                    <strong>{movement.descript}</strong>
                    </div>
                    <Value color={movement.type === "increase" ? "positivo" : "negativo"} >{movement.amount}</Value>
                </>


                }</ListItemContainer>)
            }
            </ul>
}
